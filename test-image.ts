import { GoogleGenAI } from "@google/genai";

async function test() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const modelsToTest = [
    { name: 'imagen-3.0-generate-001', method: 'generateImages' },
    { name: 'imagen-4.0-generate-001', method: 'generateImages' },
    { name: 'gemini-3.1-flash-image-preview', method: 'generateContent' },
    { name: 'gemini-2.5-flash-image', method: 'generateContent' }
  ];

  for (const model of modelsToTest) {
    console.log(`Testing ${model.name}...`);
    try {
      if (model.method === 'generateImages') {
        const response = await ai.models.generateImages({
          model: model.name,
          prompt: "A cute cat",
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: "1:1",
          },
        });
        console.log(`Success with ${model.name}!`);
      } else {
        const response = await ai.models.generateContent({
          model: model.name,
          contents: {
            parts: [{ text: "A cute cat" }],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
            },
          },
        });
        console.log(`Success with ${model.name}!`);
      }
    } catch (e: any) {
      console.error(`Error with ${model.name}:`, e.message, e.status);
    }
  }
}

test();
