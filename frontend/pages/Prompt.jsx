import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckSquare,
  Square,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const OPTIONS = [
  {
    id: "flowchart",
    title: "Visual Flowchart",
    desc: "Generate an interactive development roadmap with nodes and phases.",
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    desc: "Get curated recommendations for libraries, frameworks & architecture.",
  },
  {
    id: "bash-command",
    title: "Bash Command",
    desc: "Generate terminal commands to scaffold full project directory structure.",
  },
];

export default function ProjectPrompt() {
  const [selected, setSelected] = useState([
    "flowchart",
    "tech-stack",
    "bash-command",
  ]);
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formDisabled = loading;

  const handleBack = () => {
    if (formDisabled) return;

    navigate("/");
  };

  const toggleOption = (optId) => {
    if (formDisabled) return;

    setSelected((prev) =>
      prev.includes(optId) ? prev.filter((o) => o !== optId) : [...prev, optId],
    );
  };

  const handleGenerate = async () => {
    if (formDisabled) {
      return;
    }

    if (!idea.trim()) {
      toast.error("Please enter your project idea");
      return;
    }

    if (selected.length === 0) {
      toast.error("Please select at least one output type");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/generate/workflow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPrompt: idea.trim(),
          selected: selected,
        }),
      });

      if (!response.ok) {
        let errorMsg = "Failed to generate workflow. Please try again.";
        try {
          const errData = await response.json();
          errorMsg =
            errData.message ||
            getFallbackErrorMessage(response.status, errData.code);
        } catch {
          // Fallback if response isn't JSON
          errorMsg = getFallbackErrorMessage(response.status);
        }
        toast.error(errorMsg);
        return;
      }

      const result = await response.json();

      if (!result || typeof result !== "object") {
        toast.error("Failed to generate. Please try again.");
        return;
      }

      toast.success("Workflow generated successfully!");
      navigate("/result", {
        state: {
          ...result,
          selected,
          prompt: idea.trim(),
        },
      });
    } catch (error) {
      console.error("Workflow generation error:", error);
      toast.error("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const getFallbackErrorMessage = (status, code) => {
    if (code === "AI_PROVIDER_RATE_LIMITED" || status === 429) {
      return "The AI service is rate limited right now. Please wait a moment and try again.";
    }

    if (code === "AI_PROVIDER_TIMEOUT" || status === 504) {
      return "The AI service took too long to respond. Please try again with a shorter prompt.";
    }

    if (
      code === "AI_PROVIDER_UNAVAILABLE" ||
      code === "AI_PROVIDER_UNREACHABLE" ||
      status === 503
    ) {
      return "The AI service is temporarily unavailable. Please try again in a few minutes.";
    }

    if (code === "AI_PROVIDER_BLOCKED_OUTPUT" || status === 422) {
      return "The AI provider could not generate a valid plan. Please revise the prompt and try again.";
    }

    if (status >= 500) {
      return "The server could not generate the workflow right now. Please try again.";
    }

    return "Failed to generate workflow. Please try again.";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pb-8 pt-20 sm:pt-24 lg:py-8 bg-[#111] text-gray-200 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[600px] lg:h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(138,43,226,0.12),transparent_60%)] blur-3xl pointer-events-none" />

      <button
        type="button"
        onClick={handleBack}
        disabled={formDisabled}
        className="absolute left-4 top-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white bg-[#1D1D1D] hover:bg-[#252525] border border-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Back to home</span>
      </button>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl xl:max-w-6xl bg-[#161616]/90 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 sm:p-8 lg:p-10 transition-opacity ${
            formDisabled ? "opacity-75" : ""
          }`}
          aria-busy={formDisabled}
        >
          {/* Left: Project Input */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <header className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles size={13} />
                  <span>AI Architecture Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Design Your Architecture
                </h1>
                <p className="text-gray-400 mt-1.5 text-sm sm:text-base">
                  Describe what you want to build. Our AI will break down
                  requirements, phases, and commands.
                </p>
              </header>

              <textarea
                rows="7"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g., A real-time collaboration canvas with persistent state, multiplayer cursors, role-based access, and export to PDF/SVG..."
                disabled={formDisabled}
                className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 rounded-xl p-4 text-gray-200 placeholder-gray-500 text-sm sm:text-base transition-all duration-300 focus:shadow-[0_0_20px_rgba(138,43,226,0.25)] resize-none outline-none disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div className="text-xs text-gray-500">
              Tip: Include technical requirements, key features, and desired
              target platforms for the best accuracy.
            </div>
          </div>

          {/* Right: Options & Action */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <header className="mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Configure Output Modules
                </h2>
                <p className="text-gray-400 mt-1 text-sm">
                  Choose which planning components to generate.
                </p>
              </header>

              <div className="space-y-3">
                {OPTIONS.map((opt) => {
                  const isChecked = selected.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleOption(opt.id)}
                      aria-disabled={formDisabled}
                      className={`p-4 rounded-xl flex items-center justify-between border transition-all duration-200 select-none ${
                        formDisabled
                          ? "cursor-not-allowed opacity-70"
                          : "cursor-pointer"
                      } ${
                        isChecked
                          ? "bg-purple-900/25 border-purple-500 shadow-md"
                          : `bg-[#1D1D1D]/50 border-gray-800 ${
                              formDisabled
                                ? ""
                                : "hover:border-gray-700 hover:bg-[#1D1D1D]"
                            }`
                      }`}
                    >
                      <div className="pr-4">
                        <h3 className="font-semibold text-white text-sm sm:text-base">
                          {opt.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                          {opt.desc}
                        </p>
                      </div>

                      <div className="text-purple-400 flex-shrink-0">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-purple-400" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <button
                onClick={handleGenerate}
                disabled={loading || !idea.trim()}
                className={`w-full py-3.5 px-6 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_4px_16px_rgba(138,43,226,0.4)] transition-all duration-300 flex items-center justify-center gap-2 ${
                  loading || !idea.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-[1.01] hover:shadow-[0_6px_24px_rgba(138,43,226,0.6)] active:scale-[0.99]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Architecting your system...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Project Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
