import React from 'react';
import { Layers, Server, Database, Box, Cpu, Zap } from 'lucide-react'; 

const TechStackDisplay = ({ techStack }) => {
  const techStackArray = Object.entries(techStack).map(([category, technologies]) => ({
    category,
    technologies
  }));

  // Helper to map icons to categories
  const getIcon = (cat) => {
    const lower = cat.toLowerCase();
    if (lower.includes('front')) return <Layers className="w-5 h-5 text-blue-400" />;
    if (lower.includes('back')) return <Server className="w-5 h-5 text-purple-400" />;
    if (lower.includes('data')) return <Database className="w-5 h-5 text-emerald-400" />;
    return <Box className="w-5 h-5 text-gray-400" />;
  };

  const renderImportance = (level) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i <= level ? 'bg-white shadow-[0_0_5px_white]' : 'bg-gray-700'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 font-sans">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Tech Stack
        </h2>
        <p className="text-gray-400 text-lg">
          Technologies powering this architecture.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techStackArray.map((section, idx) => (
          <div
            key={idx}
            className="group relative bg-[#111111] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-2xl"
          >
            {/* Category Title */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
              <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 group-hover:border-gray-600 transition-colors">
                {getIcon(section.category)}
              </div>
              <h3 className="text-xl font-semibold text-gray-200">
                {section.category}
              </h3>
            </div>

            {/* Tech List */}
            <div className="space-y-6">
              {section.technologies.map((tech, tIdx) => (
                <div key={tIdx} className="relative">
                  {/* Tech Header */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-medium text-white group-hover:text-blue-400 transition-colors">
                      {tech.technology}
                    </span>
                    {renderImportance(tech.important)}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">
                    {tech.reason_to_use}
                  </p>

                  {/* Alternatives Pill */}
                  {tech.alternatives && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 rounded-full border border-gray-800">
                      <span className="text-[10px] uppercase font-bold text-gray-500">Alt</span>
                      <span className="text-xs text-gray-400">{tech.alternatives}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackDisplay;