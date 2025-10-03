import axios from "axios";

// Support both Vite and legacy Vue env var names
const HF_TOKEN = import.meta.env.VITE_HF_API_TOKEN || import.meta.env.VUE_APP_HUGGINGFACE_API_TOKEN || "";
const EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2";
const EMBEDDING_URL = `https://api-inference.huggingface.co/models/${EMBEDDING_MODEL}`;

export async function embedTexts(texts) {
  if (!HF_TOKEN) {
    throw new Error("Missing Hugging Face API token (VITE_HF_API_TOKEN)");
  }
  // HF supports batch inputs for feature-extraction on many models
  const inputs = Array.isArray(texts) ? texts : [texts];
  const { data } = await axios.post(
    EMBEDDING_URL,
    { inputs },
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      // Some models may cold start; allow more time
      timeout: 60000,
    }
  );

  // Response may be either a single vector or an array of vectors
  if (!Array.isArray(data)) {
    throw new Error("Unexpected embeddings response");
  }

  // If single text, HF returns 2D array; if batch, returns 3D array. Normalize.
  const isBatch = Array.isArray(data[0][0]);
  if (!isBatch) {
    return [data[0]];
  }
  return data.map(row => row[0]);
}

export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dot = 0;
  let aMag = 0;
  let bMag = 0;
  for (let i = 0; i < vecA.length; i++) {
    const a = vecA[i];
    const b = vecB[i];
    dot += a * b;
    aMag += a * a;
    bMag += b * b;
  }
  const denom = Math.sqrt(aMag) * Math.sqrt(bMag);
  return denom ? dot / denom : 0;
}



