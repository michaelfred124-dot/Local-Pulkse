import { GoogleGenAI } from "@google/genai";
import { storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Simple concurrency queue
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 1;
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

    let retries = 5;
    let delay = 3000; // Start with a longer delay

    // gemini-2.5-flash-image only supports these aspect ratios
    const validAspectRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const safeAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : "16:9";

    const models = [
      'gemini-2.5-flash-image', 
      'gemini-3.1-flash-image-preview', 
      'gemini-3-pro-image-preview'
    ];
    let currentModelIndex = 0;

    while (retries > 0) {
      try {
        const currentModel = models[currentModelIndex];
        
        // Handle Imagen models differently as they use generateImages instead of generateContent
        if (currentModel.startsWith('imagen')) {
          const response = await ai.models.generateImages({
            model: currentModel,
            prompt: prompt,
            config: {
              numberOfImages: 1,
              aspectRatio: safeAspectRatio as any,
              outputMimeType: 'image/png',
            },
          });

          if (response.generatedImages?.[0]?.image?.imageBytes) {
            return `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
          }
        } else {
          // Nano Banana models use generateContent
          const response = await ai.models.generateContent({
            model: currentModel,
            contents: {
              parts: [{ text: prompt }],
            },
            config: {
              imageConfig: {
                aspectRatio: safeAspectRatio as any,
                ...(currentModel.includes('3.1') ? { imageSize: "1K" as any } : {}),
              },
            },
          });

          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              return `data:image/png;base64,${part.inlineData.data}`;
            }
          }
        }
        
        break;
      } catch (error: any) {
        // Handle permission, quota, and not found errors immediately and silently if we have fallbacks
        const errorString = typeof error === 'string' ? error : (error?.message || JSON.stringify(error));
        
        const isNotFoundError = errorString.includes("NOT_FOUND") || errorString.includes("404") || errorString.includes("not found");
        const isInternalError = errorString.includes("INTERNAL") || errorString.includes("500") || errorString.includes("Internal Server Error");
        const isUnavailableError = errorString.includes("UNAVAILABLE") || errorString.includes("503") || errorString.includes("Deadline expired");
        const isQuotaError = errorString.includes("RESOURCE_EXHAUSTED") || errorString.includes("429");
        const isPermissionError = errorString.includes("PERMISSION_DENIED") || errorString.includes("403") || errorString.includes("permission");

        // If it's an error we can potentially fix by switching models, do it
        if (isNotFoundError || isInternalError || isUnavailableError || isQuotaError || isPermissionError) {
          if (currentModelIndex < models.length - 1) {
            console.warn(`Model ${models[currentModelIndex]} failed. Switching to fallback: ${models[currentModelIndex + 1]}`);
            currentModelIndex++;
            // Reset retries for the new model
            retries = 3; 
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          } else {
            // No more fallbacks, and retrying a permission/not found error won't help
            console.warn(`Could not generate image with ${models[currentModelIndex]} (or fallbacks). Using placeholder. Error:`, errorString);
            break;
          }
        }

        console.warn(`Error generating image with ${models[currentModelIndex]} (retries left: ${retries - 1}):`, errorString);
        
        retries--;
        if (retries === 0) break;
        
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // More aggressive backoff
      }
    }
    
    // Fallback to a placeholder if generation fails
    return `https://picsum.photos/seed/${encodeURIComponent(prompt.substring(0, 20))}/1280/720`;
  } finally {
    releaseToken();
  }
};

export const uploadToFirebase = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
