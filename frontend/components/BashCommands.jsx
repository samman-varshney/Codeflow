import React, { useState } from 'react';

const BashCommandsDisplay = ({ bashCommand }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  console.log("me bash ke ander hu");
  // Convert the object to array format for easier mapping
  const commandsArray = Object.entries(bashCommand).map(([comment, commands]) => ({
    comment,
    commands
  }));

  const copyToClipboard = async (text, sectionIndex, cmdIndex) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(`${sectionIndex}-${cmdIndex}`);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="font-mono bg-gray-900 text-white p-6 rounded-lg max-w-4xl mx-auto my-8 shadow-xl border border-gray-700">
      <h2 className="text-[#c271f2] text-center text-2xl font-bold mb-8">
        Project Setup Commands
      </h2>
      
      <div className="space-y-6">
        {commandsArray.map((section, sectionIndex) => (
          <div 
            key={sectionIndex} 
            className="border-l-4 border-[#2596be] pl-4 transition-all duration-200 hover:border-[#c271f2]"
          >
            {/* Comment Section */}
            <div className="text-[#2596be] font-semibold mb-3 py-2 text-lg">
              {section.comment.replace(/^#\s*/, '')}
            </div>
            
            {/* Commands Section */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              {section.commands.map((command, cmdIndex) => (
                <div 
                  key={cmdIndex} 
                  className="flex items-start mb-3 last:mb-0 py-2 px-3 rounded-md group hover:bg-gray-700 transition-colors duration-150"
                >
                  {/* Prompt Symbol */}
                  <span className="text-[#c271f2] font-bold mr-3 select-none flex-shrink-0 mt-1">
                    $
                  </span>
                  
                  {/* Command Text */}
                  <span className="text-white break-words flex-1 font-medium">
                    {command}
                  </span>
                  
                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(command, sectionIndex, cmdIndex)}
                    className="ml-3 text-xs bg-[#2596be] hover:bg-[#1e7a9c] text-white px-3 py-1 rounded flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 font-medium"
                  >
                    {copiedIndex === `${sectionIndex}-${cmdIndex}` ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-700 text-center">
        <p className="text-[#2596be] text-sm">
          Run these commands in your terminal to set up the project
        </p>
      </div>
    </div>
  );
};


export default BashCommandsDisplay;