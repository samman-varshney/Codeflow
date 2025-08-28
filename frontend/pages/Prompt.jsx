import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactFlow } from "@xyflow/react";
import AutoFlow from "../components/workflow/Autoflow";

export default function ProjectPrompt({ onGenerate }) {
  const [selected, setSelected] = useState([]);
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  // Handle page refresh for GitHub Pages or similar hosting
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname !== "/") {
        navigate("/");
      }
    };
    
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [navigate]);

  const toggleOption = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };


  const handleGenerate = async () => {
  if (idea) {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/generate/workflow`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userPrompt: idea }),
        }
      );

      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }
};


  const options = [
    {
      id: "flowchart",
      title: "Visual Flowchart",
      desc: "Generate a complete development roadmap.",
    },
    {
      id: "tech-stack",
      title: "Tech Stack",
      desc: "Get recommendations for libraries & frameworks.",
    },
    {
      id: "bash-command",
      title: "Bash Command",
      desc: "Create entire directory structure for your project",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-10 relative min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 py-6 bg-[#111] text-gray-200">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 w-[300px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[600px] lg:h-[800px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(138,43,226,0.1),transparent_60%)] blur-3xl" />

      {/* Content */}
      <div className="relative w-full max-w-4xl xl:max-w-7xl bg-[#161616]/90 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden mx-2 sm:mx-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
          {/* Left: Input */}
          <div className="flex flex-col">
            <header className="mb-3 sm:mb-5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Create a New Project Plan
              </h1>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm lg:text-base">
                Let's start with your core idea.
              </p>
            </header>

            <textarea
              rows="5"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., A social media app for sharing pet photos. Users can sign up, post pictures, follow others..."
              className="flex-grow bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 focus:ring-0 rounded-lg p-3 sm:p-4 text-gray-200 placeholder-gray-500 text-sm sm:text-base transition-all duration-300 focus:shadow-[0_0_20px_rgba(138,43,226,0.3)] resize-none"
            />
          </div>

          {/* Right: Options */}
          <div className="flex flex-col">
            <header className="mb-3 sm:mb-5">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                Configure Your Output
              </h2>
              <p className="text-gray-400 mt-1 text-xs sm:text-sm lg:text-base">
                Choose the components you need.
              </p>
            </header>

            <div className="flex-grow space-y-2 sm:space-y-3">
              {options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`option-card p-3 sm:p-4 rounded-lg flex items-center justify-between cursor-pointer border transition-all duration-300 ${
                    selected.includes(opt.id)
                      ? "bg-purple-900/30 border-purple-500"
                      : "bg-white/5 border-gray-700 hover:bg-purple-900/20 hover:border-purple-500"
                  }`}
                >
                  <div className="pr-2 sm:pr-3">
                    <h3 className="font-semibold text-white text-sm sm:text-base">
                      {opt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">{opt.desc}</p>
                  </div>
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-md border transition-all duration-300 ${
                      selected.includes(opt.id)
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-600"
                    }`}
                  >
                    {selected.includes(opt.id) && (
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-sm" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-4 sm:mt-6">
              <button
                onClick={handleGenerate}
                disabled={!idea.trim()}
                className={`generate-button w-full py-2 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-bold text-white bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_3px_12px_rgba(138,43,226,0.4)] transition-all duration-300 ${
                  !idea.trim() ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(138,43,226,0.6)]"
                }`}
              >
                {loading ? "Generating..." : "Generate Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Display response data for debugging */}
      {responseData && (
        <div style={{ width: "100vw", height: "100vh" }}>
          <AutoFlow initialEdges={responseData.edges} initialNodes={responseData.nodes} />
        </div>
      )}
    </div>
  );
}
