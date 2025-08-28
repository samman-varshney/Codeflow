"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Code2, GitBranch, BookText, TestTube2, Server } from "lucide-react";

const features = [
  {
    icon: <LayoutGrid className="h-5 w-5" />,
    title: "Visual Planning",
    desc: "Interactive flowcharts that break down your project into manageable phases",
    color: "text-purple-400",
    gradient: "from-purple-500/10 to-purple-900/10",
    border: "border-purple-500/30"
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Smart Tech Stack",
    desc: "Personalized recommendations with rationale and alternatives",
    color: "text-blue-400",
    gradient: "from-blue-500/10 to-blue-900/10",
    border: "border-blue-500/30"
  },
  {
    icon: <GitBranch className="h-5 w-5" />,
    title: "Git Integration",
    desc: "Real-time code quality suggestions as you commit",
    color: "text-orange-400",
    gradient: "from-orange-500/10 to-orange-900/10",
    border: "border-orange-500/30"
  },
  {
    icon: <BookText className="h-5 w-5" />,
    title: "Auto-Documentation",
    desc: "Generated READMEs, API docs and inline comments",
    color: "text-green-400",
    gradient: "from-green-500/10 to-green-900/10",
    border: "border-green-500/30"
  },
  {
    icon: <TestTube2 className="h-5 w-5" />,
    title: "Testing Framework",
    desc: "Pre-configured test suites for security and functionality",
    color: "text-yellow-400",
    gradient: "from-yellow-500/10 to-yellow-900/10",
    border: "border-yellow-500/30"
  },
  {
    icon: <Server className="h-5 w-5" />,
    title: "One-Click Deploys",
    desc: "Stage your work early with preview environments",
    color: "text-pink-400",
    gradient: "from-pink-500/10 to-pink-900/10",
    border: "border-pink-500/30"
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
        
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl text-gray-300 font-bold tracking-tight mt-4"
          >
            Developer Experience Elevated
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Everything you need to build, test, and deploy production-ready applications with confidence
          </motion.p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Feature card with subtle per-card gradient */}
              <div className={`relative h-full bg-gradient-to-b ${feature.gradient} border ${feature.border} rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1`}>
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-5 border border-gray-800 shadow-sm ${feature.color}`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {feature.desc}
                </p>
                
                {/* Hover indicator */}
                <div className="absolute bottom-6 left-6 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
