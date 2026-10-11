import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import AutoFlow from "../components/workflow/Autoflow";
import TechStackPanel from "../components/workflow/TechStackPanel";
import BashCommandPanel from "../components/workflow/BashCommandPanel";
import {
  ArrowLeft,
  BookmarkPlus,
  GitBranch,
  Layers,
  Terminal,
  Loader2,
  X,
  Check,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const state = location.state;

  // If no state provided (e.g. direct URL entry), redirect to /prompt
  React.useEffect(() => {
    if (!state) {
      toast.error("No workflow data found. Please generate a workflow first.");
      navigate("/prompt", { replace: true });
    }
  }, [state, navigate]);

  const handleBack = () => {
    if (location.key !== "default" && window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/prompt");
  };

  const rawSelected = state?.selected || [];
  const nodes = state?.nodes || [];
  const edges = state?.edges || [];
  const techStack = state?.techStack || state?.tech_stack || null;
  const bashCommand = state?.bashCommand || state?.bash_command || null;
  const prompt = state?.prompt || state?.userPrompt || "";

  // Determine available tabs
  const availableTabs = [];
  const hasFlowchart =
    rawSelected.includes("flowchart") || (nodes && nodes.length > 0);
  const hasTechStack =
    rawSelected.includes("tech-stack") ||
    (techStack && Object.keys(techStack).length > 0);
  const hasBash =
    rawSelected.includes("bash-command") ||
    (bashCommand && Object.keys(bashCommand).length > 0);

  if (hasFlowchart)
    availableTabs.push({
      id: "flowchart",
      label: "Flowchart",
      icon: GitBranch,
    });
  if (hasTechStack)
    availableTabs.push({ id: "tech-stack", label: "Tech Stack", icon: Layers });
  if (hasBash)
    availableTabs.push({
      id: "bash-command",
      label: "Bash Commands",
      icon: Terminal,
    });

  const [activeTab, setActiveTab] = useState(
    availableTabs.length > 0 ? availableTabs[0].id : "flowchart",
  );

  // Save Modal state
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveTitle, setSaveTitle] = useState(
    prompt ? prompt.slice(0, 40) : "My Project Plan",
  );
  const [saving, setSaving] = useState(false);

  if (!state) {
    return null;
  }

  const handleSaveWorkflow = async (e) => {
    e.preventDefault();
    if (!saveTitle.trim()) {
      toast.error("Please enter a title for this workflow");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("codeflow_token")}`,
        },
        body: JSON.stringify({
          title: saveTitle.trim(),
          prompt,
          selected: rawSelected,
          nodes,
          edges,
          techStack,
          bashCommand,
        }),
      });

      if (!response.ok) {
        let errMessage = "Failed to save workflow";
        try {
          const errData = await response.json();
          errMessage = errData.message || errData.error || errMessage;
        } catch {
          // fallback
        }
        toast.error(errMessage);
        return;
      }

      toast.success("Workflow saved successfully!");
      setShowSaveModal(false);
    } catch (error) {
      console.error("Error saving workflow:", error);
      toast.error("Network error. Unable to save workflow.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#111] text-gray-200 overflow-hidden">
      {/* Top Header & Navigation Bar */}
      <header className="flex-none h-16 border-b border-gray-800 bg-[#161616]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white bg-[#1D1D1D] hover:bg-[#252525] border border-gray-700 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-5 w-[1px] bg-gray-800 hidden sm:block" />

          <h2 className="text-sm sm:text-base font-semibold text-white truncate max-w-[200px] sm:max-w-md">
            {prompt ? `Plan: ${prompt}` : "Generated Plan"}
          </h2>
        </div>

        {/* Tab Switcher in Center */}
        {availableTabs.length > 1 && (
          <div className="flex items-center bg-[#1D1D1D] p-1 rounded-xl border border-gray-800">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSaveModal(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-[#e40b7f] hover:opacity-90 shadow-[0_2px_10px_rgba(228,11,127,0.3)] transition-all active:scale-95"
          >
            <BookmarkPlus size={16} />
            <span>Save Workflow</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {activeTab === "flowchart" && (
          <div className="w-full h-full">
            {nodes && nodes.length > 0 ? (
              <AutoFlow initialEdges={edges} initialNodes={nodes} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <GitBranch size={40} className="text-gray-600 mb-3" />
                <h3 className="text-lg font-semibold text-white">
                  No flowchart nodes generated
                </h3>
                <p className="text-sm text-gray-400">
                  Please choose Visual Flowchart when generating.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "tech-stack" && (
          <div className="w-full h-full overflow-y-auto">
            <TechStackPanel techStack={techStack} />
          </div>
        )}

        {activeTab === "bash-command" && (
          <div className="w-full h-full overflow-y-auto">
            <BashCommandPanel bashCommand={bashCommand} />
          </div>
        )}
      </main>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161616] border border-gray-800 rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">Save Workflow</h3>
            <p className="text-sm text-gray-400 mb-5">
              Save this workflow to your account to review, export, or edit at
              any time.
            </p>

            <form onSubmit={handleSaveWorkflow} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Workflow Title
                </label>
                <input
                  type="text"
                  value={saveTitle}
                  onChange={(e) => setSaveTitle(e.target.value)}
                  placeholder="e.g., E-commerce Platform Architecture"
                  required
                  className="w-full bg-[#1D1D1D] border border-gray-700 focus:border-purple-500 rounded-lg p-3 text-sm text-gray-200 outline-none transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 text-sm rounded-lg text-gray-400 hover:text-white bg-[#1D1D1D] hover:bg-[#252525] border border-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !saveTitle.trim()}
                  className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
