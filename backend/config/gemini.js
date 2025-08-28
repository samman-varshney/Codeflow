const { GoogleGenerativeAI }  = require("@google/generative-ai");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.warn("⚠️  Missing GEMINI_API_KEY in .env");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // or any other Gemini model
});

module.exports.geminiModel = geminiModel;