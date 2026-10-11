const mongoose = require('mongoose');

const savedWorkflowSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  selected: {
    type: [String],
    default: [],
  },
  nodes: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  edges: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  techStack: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  bashCommand: {
    type: mongoose.Schema.Types.Mixed,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SavedWorkflow', savedWorkflowSchema);

