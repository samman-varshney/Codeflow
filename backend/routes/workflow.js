const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const auth = require('../middleware/auth');

router.post('/generate', workflowController.createWorkflow);
router.post('/save', auth, workflowController.saveWorkflow);
router.get('/', auth, workflowController.getWorkflows);
router.get('/:id', auth, workflowController.getWorkflow);
router.delete('/:id', auth, workflowController.deleteWorkflow);

module.exports = router;

