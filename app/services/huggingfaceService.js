import axios from "axios";

const API_TOKEN = import.meta.env.VUE_APP_HUGGINGFACE_API_TOKEN;
const BASE_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn";

/**
 * Generate a text summary using Hugging Face's BART-Large-CNN model.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The summarized text.
 */
export async function generateSummary(text) {
  try {
    const response = await axios.post(
      BASE_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data[0].summary_text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary. Please try again.");
  }
}
