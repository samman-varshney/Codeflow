const { geminiProvider } = require("../utils/generateWorkflowJson");
const parseWorkflowJson = require("../utils/parseWorkflowJson");
const SavedWorkflow = require("../models/SavedWorkflow");

const classifyGenerationError = (error) => {
  const message = String(error?.message || "");
  const status = Number(error?.status || error?.statusCode || error?.code);
  const lowerMessage = message.toLowerCase();

  if (
    error?.code === "AI_PROVIDER_NOT_CONFIGURED" ||
    lowerMessage.includes("api key") ||
    lowerMessage.includes("not configured")
  ) {
    return {
      status: 503,
      code: "AI_PROVIDER_NOT_CONFIGURED",
      message:
        "The AI provider is not configured correctly. Please check the server settings.",
    };
  }

  if (
    status === 401 ||
    status === 403 ||
    lowerMessage.includes("permission") ||
    lowerMessage.includes("unauthorized") ||
    lowerMessage.includes("forbidden")
  ) {
    return {
      status: 502,
      code: "AI_PROVIDER_AUTH_FAILED",
      message:
        "The AI provider rejected the request. Please check the provider credentials.",
    };
  }

  if (
    status === 429 ||
    lowerMessage.includes("rate limit") ||
    lowerMessage.includes("quota") ||
    lowerMessage.includes("resource_exhausted")
  ) {
    return {
      status: 429,
      code: "AI_PROVIDER_RATE_LIMITED",
      message:
        "The AI service is rate limited right now. Please wait a moment and try again.",
    };
  }

  if (
    status === 503 ||
    lowerMessage.includes("service unavailable") ||
    lowerMessage.includes("overloaded") ||
    lowerMessage.includes("temporarily unavailable")
  ) {
    return {
      status: 503,
      code: "AI_PROVIDER_UNAVAILABLE",
      message:
        "The AI service is temporarily unavailable. Please try again in a few minutes.",
    };
  }

  if (
    status === 408 ||
    status === 504 ||
    error?.name === "AbortError" ||
    lowerMessage.includes("timeout") ||
    lowerMessage.includes("timed out")
  ) {
    return {
      status: 504,
      code: "AI_PROVIDER_TIMEOUT",
      message:
        "The AI service took too long to respond. Please try again with a shorter prompt.",
    };
  }

  if (
    lowerMessage.includes("fetch failed") ||
    lowerMessage.includes("econnrefused") ||
    lowerMessage.includes("enotfound") ||
    lowerMessage.includes("network")
  ) {
    return {
      status: 503,
      code: "AI_PROVIDER_UNREACHABLE",
      message:
        "The AI service could not be reached. Please make sure it is running and try again.",
    };
  }

  if (
    lowerMessage.includes("blocked") ||
    lowerMessage.includes("safety") ||
    lowerMessage.includes("finish_reason")
  ) {
    return {
      status: 422,
      code: "AI_PROVIDER_BLOCKED_OUTPUT",
      message:
        "The AI provider blocked the response. Please revise the prompt and try again.",
    };
  }

  if (
    lowerMessage.includes("no response") ||
    lowerMessage.includes("no response content")
  ) {
    return {
      status: 502,
      code: "AI_PROVIDER_EMPTY_RESPONSE",
      message:
        "The AI service returned an empty response. Please try again.",
    };
  }

  return {
    status: 500,
    code: "WORKFLOW_GENERATION_FAILED",
    message:
      "Something went wrong while generating the workflow. Please try again.",
  };
};

exports.createWorkflow = async (req, res) => {
  try {
    const { userPrompt, selected } = req.body;

    if (!userPrompt || typeof userPrompt !== "string" || !userPrompt.trim()) {
      return res.status(400).json({ message: "userPrompt is required" });
    }

    const jsonObject = await geminiProvider(userPrompt, selected);

    if (!jsonObject) {
      return res.status(422).json({
        message:
          "Unable to parse workflow from model output. Please try again with more details.",
      });
    }

    const parsedWorkflow = parseWorkflowJson(jsonObject);

    return res.status(200).json(parsedWorkflow);
  } catch (error) {
    console.error("Create workflow error:", error);
    const generationError = classifyGenerationError(error);
    return res.status(generationError.status).json({
      message: generationError.message,
      code: generationError.code,
      ...(process.env.NODE_ENV !== "production" && { error: error.message }),
    });
  }
};

exports.saveWorkflow = async (req, res) => {
  try {
    const { title, prompt, selected, nodes, edges, techStack, bashCommand } =
      req.body;

    if (!title || !prompt) {
      return res
        .status(400)
        .json({ message: "Title and prompt are required to save workflow" });
    }

    const saved = new SavedWorkflow({
      userId: req.user.id,
      title: title.trim(),
      prompt,
      selected: Array.isArray(selected) ? selected : [],
      nodes: Array.isArray(nodes) ? nodes : [],
      edges: Array.isArray(edges) ? edges : [],
      techStack: techStack || null,
      bashCommand: bashCommand || null,
    });

    await saved.save();

    return res
      .status(201)
      .json({ message: "Workflow saved successfully", workflow: saved });
  } catch (error) {
    console.error("Save workflow error:", error);
    return res.status(500).json({
      message: "Internal server error while saving workflow",
      error: error.message,
    });
  }
};

exports.getWorkflows = async (req, res) => {
  try {
    const workflows = await SavedWorkflow.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(workflows);
  } catch (error) {
    console.error("Get workflows error:", error);
    return res.status(500).json({
      message: "Internal server error while fetching workflows",
      error: error.message,
    });
  }
};

exports.getWorkflow = async (req, res) => {
  try {
    const workflow = await SavedWorkflow.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    return res.status(200).json(workflow);
  } catch (error) {
    console.error("Get single workflow error:", error);
    return res.status(500).json({
      message: "Internal server error while fetching workflow",
      error: error.message,
    });
  }
};

exports.deleteWorkflow = async (req, res) => {
  try {
    const workflow = await SavedWorkflow.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workflow) {
      return res.status(404).json({ message: "Workflow not found" });
    }

    return res.status(200).json({ message: "Workflow deleted successfully" });
  } catch (error) {
    console.error("Delete workflow error:", error);
    return res.status(500).json({
      message: "Internal server error while deleting workflow",
      error: error.message,
    });
  }
};
