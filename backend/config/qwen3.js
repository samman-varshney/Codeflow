const OLLAMA_URL = process.env.OLLAMA_URL;

const createQwenError = (message, status, code) => {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
};

async function generateWithQwen(prompt) {
  if (!OLLAMA_URL) {
    throw createQwenError(
      "OLLAMA_URL is not configured",
      503,
      "AI_PROVIDER_NOT_CONFIGURED"
    );
  }

  const result = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "qwen3:4b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
      think: false,
    }),
  });

  if (!result.ok) {
    throw createQwenError(
      `Qwen request failed with status ${result.status}`,
      result.status,
      "AI_PROVIDER_HTTP_ERROR"
    );
  }

  const data = await result.json();
  return data.message.content;
}

module.exports.generateWithQwen = generateWithQwen;
