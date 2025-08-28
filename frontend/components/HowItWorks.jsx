"use client";

import { motion } from "framer-motion";
import { FileText, LayoutGrid, Code2, GitBranch, TestTube2, Rocket } from "lucide-react";

const workflowSteps = [
  { 
    icon: <FileText className="h-5 w-5" />, 
    title: "Describe Your Project", 
    desc: "Explain what you're building in plain English",
    phase: "Planning",
    color: "bg-purple-500",
    textColor: "text-purple-400"
  },
  { 
    icon: <LayoutGrid className="h-5 w-5" />, 
    title: "Get AI-Generated Flowchart", 
    desc: "Visual breakdown of development phases",
    phase: "Planning",
    color: "bg-pink-500",
    textColor: "text-pink-400"
  },
  { 
    icon: <Code2 className="h-5 w-5" />, 
    title: "Review Tech Stack", 
    desc: "With explanations for each choice",
    phase: "Planning",
    color: "bg-indigo-500",
    textColor: "text-indigo-400"
  },
  { 
    icon: <GitBranch className="h-5 w-5" />, 
    title: "Start Coding", 
    desc: "With built-in documentation prompts",
    phase: "Execution",
    color: "bg-blue-500",
    textColor: "text-blue-400"
  },
  { 
    icon: <TestTube2 className="h-5 w-5" />, 
    title: "Test & Refactor", 
    desc: "Automated quality checks and suggestions",
    phase: "Execution",
    color: "bg-cyan-500",
    textColor: "text-cyan-400"
  },
  { 
    icon: <Rocket className="h-5 w-5" />, 
    title: "Deploy & Iterate", 
    desc: "Preview environments for early feedback",
    phase: "Execution",
    color: "bg-teal-500",
    textColor: "text-teal-400"
  }
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/80 via-gray-950 to-gray-950"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:100px_100px] opacity-10"></div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.15 }} transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }} className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
        <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 0.1 }} transition={{ duration: 3, ease: "easeOut" }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.3)_0%,_transparent_70%)]" />
      </div>

      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,_#FFF_0%,_#AAA_100%)]">
            How It Works
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            A streamlined process from idea to production-ready implementation
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className={`absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent`}>
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-950 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-950 to-transparent"></div>
            <motion.div initial={{ y: -100 }} animate={{ y: "100%" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1.5 }} className="absolute left-0 md:left-1/2 top-0 h-full w-px -ml-px">
            <motion.div animate={{ opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 left-0 w-px h-full bg-purple-500/30 shadow-[0_0_20px_8px_rgba(168,85,247,0.3)]" />
          </motion.div>

          {workflowSteps.map((step, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }} className={`relative mb-16 last:mb-0 flex flex-col md:flex-row ${index % 2 === 0 ? 'items-start' : 'items-end md:flex-row-reverse'}`}>
              
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 500 }} className={`absolute left-6 top-5 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full ${step.color} shadow-lg z-10`}>
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }} className="absolute inset-0 rounded-full bg-white" />
              </motion.div>

              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }} className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 shadow-lg z-10 ${index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'}`}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 + 0.4 }} className={step.textColor}>
                  {step.icon}
                </motion.div>
              </motion.div>

              <div className={`relative mt-4 md:mt-0 flex-1 ${index % 2 === 0 ? 'md:mr-16' : 'md:ml-16'}`}>
                <motion.div initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.2 }} className="relative h-full bg-gray-900/80 border border-gray-800 rounded-xl p-6 backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="absolute -left-px top-6 w-px h-8 bg-gray-800 md:hidden"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.1 + 0.3 }} className={`text-xs font-medium py-1 px-2 rounded-full ${step.color}/20 ${step.textColor}`}>
                        Step {index + 1}
                      </motion.span>
                      <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: index * 0.1 + 0.35 }} className="text-sm font-medium text-gray-500">
                        {step.phase}
                      </motion.span>
                    </div>
                    <motion.h3 initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.4 }} className={`text-xl font-semibold text-white mb-2 group-hover:${step.textColor} transition-colors`}>
                      {step.title}
                    </motion.h3>
                    <motion.p initial={{ opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.45 }} className="text-gray-400 text-sm md:text-base leading-relaxed">
                      {step.desc}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
