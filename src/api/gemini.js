// const dotenv = require("dotenv");
// dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// console.log(process.env.REACT_APP_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI("AIzaSyCPrZZ3vxVJDWoBfrVYMoGeWQ8Tp12_nLw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getGeminiCompletion(messages, prompt) {
    try {
      const result = await model.generateContent(prompt);
      const res = result.response.text()
      // console.log(typeof(res));
      return res;
    } catch (error) {
      console.error('Error fetching Gemini completion:', error);
      return { content: 'Error fetching response from AI.' };
    }
}

getGeminiCompletion("", "hi gemini");
module.exports = { getGeminiCompletion };
