module.exports = function (jsonString) {
    try {
        // Remove the Markdown code block markers if present
        let cleanedString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');

        // Parse the JSON string into an object
        const jsonObject = JSON.parse(cleanedString);

        return jsonObject;
    } catch (error) {
        console.error("Error parsing JSON string:", error);
        return null;
    }
}