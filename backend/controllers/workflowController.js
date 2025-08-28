const generateWorkflowJson = require('../utils/generateWorkflowJson');
const parseWorkflowJson = require('../utils/parseWorkflowJson');

module.exports.createWorkflow = async (req, res) => {
    const {userPrompt} = req.body;
    const jsonObject = await generateWorkflowJson(userPrompt);
    const parsedWorkflow = parseWorkflowJson(jsonObject);
    res.json(parsedWorkflow);
}