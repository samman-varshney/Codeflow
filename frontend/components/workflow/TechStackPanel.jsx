import React from 'react';
import { Star, Layers, Server, Database, Cloud, Wrench } from 'lucide-react';

const CATEGORY_CONFIG = {
  frontend: {
    title: 'Frontend Development',
    icon: Layers,
    accent: 'from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-400',
  },
  backend: {
    title: 'Backend Architecture',
    icon: Server,
    accent: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
  },
  database: {
    title: 'Database & Storage',
    icon: Database,
    accent: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
  },
  hosting: {
    title: 'Deployment & Hosting',
    icon: Cloud,
    accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  other_tools: {
    title: 'Additional Tools & Libraries',
    icon: Wrench,
    accent: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
  'other tools': {
    title: 'Additional Tools & Libraries',
    icon: Wrench,
    accent: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  },
};

function ImportanceRating({ score }) {
  // score could be "5", 5, "grade 4", etc.
  let parsed = parseInt(score, 10);
  if (isNaN(parsed) || parsed < 1) parsed = 3;
  if (parsed > 5) parsed = 5;

  return (
    <div className="flex items-center gap-1" title={`Importance: ${parsed}/5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={`${
            star <= parsed
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-600 fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export default function TechStackPanel({ techStack }) {
  if (!techStack || typeof techStack !== 'object' || Object.keys(techStack).length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-purple-900/20 border border-purple-500/30 flex items-center justify-center mb-4 text-purple-400">
          <Layers size={32} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Tech Stack Specified</h3>
        <p className="text-gray-400 max-w-md text-sm">
          No tech stack recommendations were generated for this workflow or the option was not selected.
        </p>
      </div>
    );
  }

  const categories = Object.keys(techStack).filter(
    (cat) => Array.isArray(techStack[cat]) && techStack[cat].length > 0
  );

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <h3 className="text-xl font-semibold text-white mb-2">No Technologies Found</h3>
        <p className="text-gray-400 max-w-md text-sm">
          The tech stack section does not contain any categorized recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-fadeIn">
      {categories.map((catKey) => {
        const config = CATEGORY_CONFIG[catKey] || {
          title: catKey.charAt(0).toUpperCase() + catKey.slice(1),
          icon: Layers,
          accent: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
        };
        const IconComponent = config.icon;
        const items = techStack[catKey];

        return (
          <section key={catKey} className="space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-800 pb-3">
              <div className="p-2 rounded-lg bg-[#161616] border border-gray-800 text-[#e40b7f]">
                <IconComponent size={20} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                  {config.title}
                </h3>
                <span className="text-xs text-gray-400">
                  {items.length} {items.length === 1 ? 'recommendation' : 'recommendations'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {items.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-[#161616]/90 border border-gray-800 hover:border-purple-500/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(138,43,226,0.15)] group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {tech.technology || tech.name || 'Unnamed Technology'}
                      </h4>
                      {(tech.important || tech.importance) && (
                        <ImportanceRating score={tech.important || tech.importance} />
                      )}
                    </div>

                    {tech.reason_to_use && (
                      <p className="text-sm text-gray-300 mb-4 leading-relaxed bg-[#1D1D1D]/70 p-3 rounded-lg border border-gray-800/80">
                        {tech.reason_to_use}
                      </p>
                    )}
                  </div>

                  {tech.alternatives && (
                    <div className="pt-3 border-t border-gray-800/80 mt-auto">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 block mb-1">
                        Alternatives
                      </span>
                      <p className="text-xs text-purple-400 font-mono">
                        {Array.isArray(tech.alternatives)
                          ? tech.alternatives.join(', ')
                          : tech.alternatives}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

