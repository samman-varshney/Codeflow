import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  FolderKanban,
  Trash2,
  Calendar,
  Layers,
  ArrowRight,
  ArrowLeft,
  Plus,
  Loader2,
  GitBranch,
  Terminal,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function SavedWorkflows() {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchSavedWorkflows = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token || localStorage.getItem("codeflow_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved workflows");
      }

      const data = await response.json();
      setWorkflows(Array.isArray(data) ? data : data.workflows || []);
    } catch (error) {
      console.error("Fetch workflows error:", error);
      toast.error("Failed to load saved workflows");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedWorkflows();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this workflow?")) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("codeflow_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete workflow");
      }

      toast.success("Workflow deleted");
      setWorkflows((prev) => prev.filter((wf) => (wf._id || wf.id) !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete workflow");
    } finally {
      setDeletingId(null);
    }
  };

  const handleOpenWorkflow = (workflow) => {
    navigate("/result", {
      state: {
        nodes: workflow.nodes || [],
        edges: workflow.edges || [],
        techStack: workflow.techStack || workflow.tech_stack || null,
        bashCommand: workflow.bashCommand || workflow.bash_command || null,
        selected: workflow.selected || ["flowchart"],
        prompt: workflow.prompt || workflow.title,
      },
    });
  };

  return (
    <div className="relative min-h-screen bg-[#111] text-gray-200 px-4 sm:px-8 py-10 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(138,43,226,0.1),transparent_60%)] blur-3xl pointer-events-none" />
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-4 top-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white bg-[#1D1D1D] hover:bg-[#252525] border border-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Back to home</span>
      </button>
      <div className="relative mt-5 z-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <FolderKanban className="text-[#e40b7f]" />
              <span>Saved Workflows</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              View, revisit, and export your saved software architecture
              roadmaps
            </p>
          </div>

          <Link
            to="/prompt"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-semibold text-sm shadow-lg transition-all active:scale-95"
          >
            <Plus size={16} />
            <span>New Workflow</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-[#161616] border border-gray-800/80 rounded-2xl p-6 h-52 animate-pulse flex flex-col justify-between"
              >
                <div>
                  <div className="h-5 bg-gray-800 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-800/60 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-800/60 rounded w-2/3" />
                </div>
                <div className="h-4 bg-gray-800/40 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && workflows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#161616]/60 rounded-3xl border border-gray-800/60 p-8">
            <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-4 text-[#e40b7f]">
              <FolderKanban size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No Saved Workflows
            </h3>
            <p className="text-gray-400 max-w-md text-sm mb-6">
              You haven't saved any workflow plans yet. Generate a project
              roadmap and click "Save Workflow" to keep it here.
            </p>
            <Link
              to="/prompt"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm rounded-xl transition-all shadow"
            >
              Generate Your First Plan
            </Link>
          </div>
        )}

        {/* Grid of Cards */}
        {!loading && workflows.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((wf) => {
              const wfId = wf._id || wf.id;
              const dateStr = wf.createdAt
                ? new Date(wf.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recent";

              const badges = wf.selected || [];

              return (
                <div
                  key={wfId}
                  onClick={() => handleOpenWorkflow(wf)}
                  className="bg-[#161616] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:shadow-[0_4px_24px_rgba(138,43,226,0.15)] group relative"
                >
                  <div>
                    {/* Title & Delete */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                        {wf.title || "Untitled Workflow"}
                      </h3>
                      <button
                        onClick={(e) => handleDelete(e, wfId)}
                        disabled={deletingId === wfId}
                        className="text-gray-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                        title="Delete workflow"
                      >
                        {deletingId === wfId ? (
                          <Loader2
                            size={16}
                            className="animate-spin text-red-400"
                          />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>

                    {/* Prompt Preview */}
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                      {wf.prompt || "No description provided."}
                    </p>
                  </div>

                  <div>
                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(badges.includes("flowchart") ||
                        (wf.nodes && wf.nodes.length > 0)) && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300">
                          <GitBranch size={11} /> Flowchart
                        </span>
                      )}
                      {(badges.includes("tech-stack") || wf.techStack) && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-500/30 text-blue-300">
                          <Layers size={11} /> Tech Stack
                        </span>
                      )}
                      {(badges.includes("bash-command") || wf.bashCommand) && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                          <Terminal size={11} /> Bash
                        </span>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-800/80 pt-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>{dateStr}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>View</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
