const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCidKhemWpadfEBt1uyAOPlT2R-Hc0Clq4");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getGeminiCompletion(messages, prompt) {
  try {
    const result = await model.generateContent(prompt);
    const res = result.response.text();
    return res;
  } catch (error) {
    if (error.status === 429) {
      console.error("Rate limit reached. Please try again later.");
      return "Rate limit exceeded. Please try again later or tomorrow.";
    }

    console.error("Error fetching Gemini completion:", error);
    return { content: "An unexpected error occurred while fetching a response from AI." };
  }
}

module.exports = { getGeminiCompletion };
