const {generatePrompt} = require('./prompt');
const {geminiModel} = require('../config/gemini');
const jsonParser = require('./jsonParser');

module.exports = async (idea) => {
    const result = await geminiModel.generateContent(generatePrompt(idea));
    const jsonString = result.response.candidates[0].content.parts[0].text;
    return jsonParser(jsonString);
};
