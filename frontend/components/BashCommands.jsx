import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

const BashCommandsDisplay = ({ bashCommand }) => {
  const [copied, setCopied] = useState(null);

  const commandsArray = Object.entries(bashCommand).map(([comment, commands]) => ({
    comment,
    commands
  }));

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-6">
        <Terminal className="text-gray-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Installation Sequence</h2>
      </div>

      {/* The Terminal Window */}
      <div className="bg-[#0c0c0c] rounded-xl border border-gray-800 overflow-hidden shadow-2xl font-mono text-sm">
        
        {/* Window Controls (Mac Style) */}
        <div className="bg-[#1a1a1a] px-4 py-3 flex items-center border-b border-gray-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="mx-auto text-gray-500 text-xs font-medium opacity-60">
            user@project:~/setup
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 space-y-8">
          {commandsArray.map((section, sIdx) => (
            <div key={sIdx} className="group">
              {/* Comment Line */}
              <div className="flex items-center gap-2 text-gray-500 mb-3 select-none">
                <span>#</span>
                <span>{section.comment.replace(/^#\s*/, '')}</span>
              </div>

              {/* Command Lines */}
              <div className="space-y-3">
                {section.commands.map((cmd, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="relative flex items-center bg-[#111] hover:bg-[#161616] border border-gray-800 hover:border-gray-700 rounded-lg p-3 transition-all duration-200"
                  >
                    {/* Prompt */}
                    <span className="text-emerald-500 mr-3 select-none">➜</span>
                    
                    {/* Command Text */}
                    <span className="text-gray-200 flex-1 break-all">
                      {cmd}
                    </span>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(cmd, `${sIdx}-${cIdx}`)}
                      className="ml-3 p-2 cursor-pointer rounded-md hover:bg-white/10 transition-colors focus:outline-none"
                    >
                      {copied === `${sIdx}-${cIdx}` ? (
                        <Check size={16} className="text-emerald-400" />
                      ) : (
                        <Copy size={16} className="text-gray-500 hover:text-white" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Active Cursor Animation */}
          <div className="mt-4">
             <span className="text-emerald-500">➜</span>
             <span className="ml-2 w-2 h-4 bg-gray-500 inline-block animate-pulse align-middle"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BashCommandsDisplay;