import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string | undefined => {
  const raw = (process.env.GEMINI_API_KEY || process.env.API_KEY) as unknown;
  if (typeof raw !== 'string') return undefined;
  const key = raw.trim();
  return key.length > 0 ? key : undefined;
};

let cachedClient: GoogleGenAI | null = null;
const getClient = (): GoogleGenAI => {
  if (cachedClient) return cachedClient;
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('Falta GEMINI_API_KEY en .env');
  }
  // Según la documentación oficial, GoogleGenAI se inicializa con { apiKey }
  cachedClient = new GoogleGenAI({ apiKey });
  return cachedClient;
};

const toUserFacingGeminiError = (error: unknown): Error => {
  const err = error as { status?: unknown; message?: unknown };
  const status = typeof err?.status === 'number' ? err.status : undefined;
  const message = typeof err?.message === 'string' ? err.message : '';

  if (status === 429 || /quota exceeded|RESOURCE_EXHAUSTED/i.test(message)) {
    return new Error('La cuota de Gemini está agotada (429). Revisa tu plan/billing y límites de la API.');
  }
  if (status === 401) return new Error('API Key inválida o expirada (401).');
  if (status === 403) return new Error('La API Key no tiene permisos (403). Revisa restricciones y API habilitada.');
  if (status) return new Error(`Error de Gemini (${status}): ${message || 'Solicitud fallida.'}`);
  if (message) return new Error(`Error de Gemini: ${message}`);
  return new Error('Error de Gemini: solicitud fallida.');
};

/**
 * Generates a variant of the provided furniture image using a specific texture prompt.
 * Uses gemini-2.5-flash-image (Nano Banana) - optimized for speed and efficiency.
 */
export const generateFurnitureVariant = async (
  base64Image: string,
  textureDescription: string
): Promise<string | null> => {
  try {
    const ai = getClient();
    const prompt = `Edit this furniture image. Change the material of the furniture to ${textureDescription}. Maintain the exact shape, lighting, perspective, and background of the original image. The goal is to visualize this exact same piece of furniture but manufactured in ${textureDescription}. Photorealistic quality.`;

    // Según la documentación oficial de @google/genai, contents es un array de partes
    // Usando gemini-2.5-flash-image para generación rápida y eficiente de imágenes
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
          },
        },
      ],
    });

    // Iterar sobre las partes para encontrar la imagen generada
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    return null;
  } catch (error) {
    throw toUserFacingGeminiError(error);
  }
};
