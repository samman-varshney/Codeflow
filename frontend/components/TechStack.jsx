import React from 'react';

const TechStackDisplay = ({ techStack }) => {
  // Convert the object to array format for easier mapping
  const techStackArray = Object.entries(techStack).map(([category, technologies]) => ({
    category,
    technologies
  }));

  // Function to render importance indicators
  const renderImportance = (importance) => {
    const importanceNum = parseInt(importance);
    const bars = [];
    
    for (let i = 1; i <= 5; i++) {
      bars.push(
        <div
          key={i}
          className={`w-3 h-1 rounded-full ${
            i <= importanceNum 
              ? 'bg-[#626063] shadow-[0_0_8px_#626063]' 
              : 'bg-gray-600'
          }`}
        />
      );
    }
    return bars;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <h1 className="text-5xl font-bold text-[#6d3499] mb-4 tracking-tight 
                         drop-shadow-[0_0_15px_#626063] font-mono">
            TECHNOLOGY_STACK
          </h1>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#6d3499] 
                         shadow-[0_0_10px_#626063]"></div>
        </div>
        <p className="text-xl text-[#6d3499] max-w-2xl mx-auto font-mono 
                     drop-shadow-[0_0_8px_#626063]">
            SYSTEM ARCHITECTURE OVERVIEW
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {techStackArray.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-gray-900 rounded-lg border-2 border-[#626063] 
                      shadow-[0_0_20px_#626063] hover:shadow-[0_0_30px_#626063] 
                      transition-all duration-300 transform hover:-translate-y-1 
                      backdrop-blur-sm"
          >
            {/* Category Header */}
            <div className="bg-black border-b-2 border-[#626063] p-4 
                          shadow-[0_0_15px_#626063]">
              <h2 className="text-xl font-bold text-[#626063] uppercase 
                           tracking-wider font-mono drop-shadow-[0_0_8px_#626063]">
                {`[${section.category}]`}
              </h2>
            </div>

            {/* Technologies List */}
            <div className="p-4 space-y-4">
              {section.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="border-l-2 border-[#626063] pl-4 py-3 bg-gray-800 
                            rounded-r-lg hover:bg-gray-750 transition-colors 
                            duration-200 group"
                >
                  {/* Technology Name and Importance */}
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-[#626063] font-mono
                                 group-hover:drop-shadow-[0_0_8px_#626063] 
                                 transition-all duration-200">
                      {tech.technology}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {renderImportance(tech.important)}
                    </div>
                  </div>

                  {/* Reason to Use */}
                  <p className="text-gray-300 text-sm mb-3 leading-relaxed 
                              font-mono">
                    {tech.reason_to_use}
                  </p>

                  {/* Alternatives */}
                  <div className="border-t border-gray-600 pt-2">
                    <span className="text-xs font-bold text-[#626063] 
                                   uppercase tracking-wider font-mono 
                                   drop-shadow-[0_0_5px_#626063]">
                      ALTERNATIVES:
                    </span>
                    <p className="text-gray-400 text-sm font-mono mt-1">
                      {tech.alternatives}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-12 p-6 bg-gray-900 rounded-lg border-2 border-[#626063] 
                     shadow-[0_0_20px_#626063]">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-[#626063] font-mono 
                       drop-shadow-[0_0_8px_#626063]">
            SYSTEM_IMPORTANCE_METRICS
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {renderImportance(5)}
            </div>
            <span className="text-[#626063] font-mono text-sm">CRITICAL</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {renderImportance(3)}
            </div>
            <span className="text-[#626063] font-mono text-sm">STANDARD</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {renderImportance(1)}
            </div>
            <span className="text-[#626063] font-mono text-sm">OPTIONAL</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-[#626063] font-mono text-sm 
                     drop-shadow-[0_0_5px_#626063]">
          // SYSTEM_READY
        </p>
      </div>
    </div>
  );
};
export default TechStackDisplay;