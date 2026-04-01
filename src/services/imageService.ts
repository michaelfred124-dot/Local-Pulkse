import { GoogleGenAI } from "@google/genai";

// Simple concurrency queue
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 2;
const requestQueue: (() => void)[] = [];

const acquireToken = async () => {
  if (activeRequests < MAX_CONCURRENT_REQUESTS) {
    activeRequests++;
    return;
  }
  return new Promise<void>((resolve) => {
    requestQueue.push(resolve);
  });
};

const releaseToken = () => {
  if (requestQueue.length > 0) {
    const next = requestQueue.shift();
    if (next) next();
  } else {
    activeRequests--;
  }
};

export const generateImage = async (prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" | "1:4" | "1:8" | "4:1" | "8:1" = "16:9") => {
  await acquireToken();
  try {
    // Create a new instance right before the call to use the latest API key
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("No API key found for image generation");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    let retries = 3;
    let delay = 2000; // Start with a longer delay

    // gemini-2.5-flash-image only supports these aspect ratios
    const validAspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const safeAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : "16:9";

    while (retries > 0) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: prompt,
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: safeAspectRatio as any,
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
        
        // If we got a successful response but no image, break out of retry loop
        break;
      } catch (error: any) {
        console.error(`Error generating image (retries left: ${retries - 1}):`, error);
        
        // Handle permission errors immediately, don't retry
        if (error?.message?.includes("403") || error?.status === "PERMISSION_DENIED") {
          console.warn("Permission denied for image generation. The selected API key might not have access to this model.");
          break;
        }
        
        retries--;
        if (retries === 0) {
          if (error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED") {
            console.warn("Quota exceeded for image generation. Consider selecting a paid API key.");
          }
          break;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
    
    // Fallback to a placeholder if generation fails
    return `https://picsum.photos/seed/${encodeURIComponent(prompt.substring(0, 20))}/1280/720`;
  } finally {
    releaseToken();
  }
};
