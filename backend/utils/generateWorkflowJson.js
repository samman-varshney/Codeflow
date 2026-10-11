const { generateWithQwen } = require("../config/qwen3");
const { geminiModel } = require("../config/gemini");
const jsonParser = require("./jsonParser");
const { generatePrompt } = require("./prompt");

const geminiProvider = async (prompt, selected) => {
  try {
    const promptText = generatePrompt(prompt, selected);
    const result = await geminiModel.generateContent(promptText);
    const candidate = result?.response?.candidates?.[0];
    const jsonString = candidate?.content?.parts?.[0]?.text;
    if (!jsonString) {
      throw new Error("No response content received from Gemini model");
    }
    return jsonParser(jsonString);
  } catch (error) {
    console.error("Gemini provider error:", error.message);
    throw error;
  }
};

const qwen3Provider = async (prompt, selected) => {
  try {
    const promptText = generatePrompt(prompt, selected);
    const result = await generateWithQwen(promptText);
    if (!result) {
      throw new Error("No response received from Qwen model");
    }
    return jsonParser(result);
  } catch (error) {
    console.error("Qwen3 provider error:", error.message);
    throw error;
  }
};

module.exports = {
  geminiProvider,
  qwen3Provider,
};
