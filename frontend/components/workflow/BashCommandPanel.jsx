import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Terminal, Copy, Check, Code2 } from 'lucide-react';

export default function BashCommandPanel({ bashCommand }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!bashCommand || typeof bashCommand !== 'object' || Object.keys(bashCommand).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400">
          <Terminal size={32} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Bash Commands Generated</h3>
        <p className="text-gray-400 max-w-md text-sm">
          No directory setup commands were generated for this workflow or the option was not selected.
        </p>
      </div>
    );
  }

  // Format array of commands or string
  const formatCommands = (cmdVal) => {
    if (Array.isArray(cmdVal)) {
      return cmdVal.filter(Boolean).join('\n');
    }
    return typeof cmdVal === 'string' ? cmdVal : '';
  };

  // Build full script
  const buildFullScript = () => {
    let scriptLines = [];
    Object.entries(bashCommand).forEach(([key, val]) => {
      if (key === 'shebang') {
        const lines = formatCommands(val);
        if (lines) scriptLines.push(lines);
      } else {
        if (key.startsWith('#')) {
          scriptLines.push(`\n${key}`);
        } else {
          scriptLines.push(`\n# ${key}`);
        }
        const lines = formatCommands(val);
        if (lines) scriptLines.push(lines);
      }
    });
    return scriptLines.join('\n');
  };

  const handleCopyAll = async () => {
    try {
      const full = buildFullScript();
      await navigator.clipboard.writeText(full);
      setCopiedAll(true);
      toast.success('All commands copied to clipboard!');
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCopySection = async (sectionKey, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedKey(sectionKey);
      toast.success(`Copied section: ${sectionKey}`);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      toast.error('Failed to copy to clipboard');
    }
  };

  const entries = Object.entries(bashCommand).filter(([_, val]) => {
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val);
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-fadeIn">
      {/* Header and Copy All */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161616]/90 border border-gray-800 p-4 sm:p-5 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-[#e40b7f]">
            <Terminal size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Project Setup Script</h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Run these commands in your shell to scaffold the initial project structure
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-400 hover:from-purple-500 hover:to-purple-300 text-white font-semibold text-sm rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap"
        >
          {copiedAll ? <Check size={16} /> : <Copy size={16} />}
          <span>{copiedAll ? 'Copied Full Script!' : 'Copy All Commands'}</span>
        </button>
      </div>

      {/* Command blocks */}
      <div className="space-y-4">
        {entries.map(([key, rawVal], idx) => {
          const content = formatCommands(rawVal);
          const isCopied = copiedKey === key;
          const displayTitle = key.startsWith('#') ? key.replace(/^#\s*/, '') : key;

          return (
            <div
              key={idx}
              className="bg-[#161616] border border-gray-800 rounded-xl overflow-hidden shadow-lg hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#1D1D1D]/70 border-b border-gray-800">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-purple-300">
                  <Code2 size={16} className="text-gray-400" />
                  <span>{displayTitle}</span>
                </div>

                <button
                  onClick={() => handleCopySection(key, content)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-md border border-gray-800 transition-all"
                >
                  {isCopied ? (
                    <>
                      <Check size={13} className="text-green-400" />
                      <span className="text-green-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-black/60 overflow-x-auto">
                <pre className="font-mono text-xs sm:text-sm text-green-400/90 leading-relaxed whitespace-pre">
                  {content}
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

