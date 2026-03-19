const { GoogleGenerativeAI } = require("@google/generative-ai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ Missing GEMINI_API_KEY in .env. API calls will fail.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || "");

// Using the stable 2.5 Flash model
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

module.exports.geminiModel = geminiModel;
