import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ArrowRight, Zap, Code2, GitPullRequest } from 'lucide-react';

const Button = ({ children, className, ...props }) => (
  <button 
    className={`inline-flex items-center justify-center rounded-lg font-medium py-3 px-6 transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function GitHubIntegration() {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <section className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring", damping: 10 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:100px_100px] opacity-10" />
          <div className="absolute inset-0 transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />

          {/* Glow effect */}
          <div className="absolute rounded-3xl blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

          {/* Main content */}
          <div className="relative border border-white/10rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-sm font-medium"
              >
                <Zap className="h-4 w-4" />
                Developer Productivity
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(180deg,_#FFF_0%,_#AAA_100%)] mb-6"
              >
                Supercharge Your Development Workflow
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Seamlessly connect your GitHub repository to unlock powerful features like automated documentation, intelligent code reviews, and continuous deployment pipelines.
              </motion.p>

              {/* Features grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
              >
                {[
                  { icon: <Code2 className="h-5 w-5" />, text: "Code Analysis" },
                  { icon: <GitBranch className="h-5 w-5" />, text: "Branch Protection" },
                  { icon: <GitPullRequest className="h-5 w-5" />, text: "PR Templates" },
                  { icon: <Zap className="h-5 w-5" />, text: "CI/CD" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-center gap-2 text-sm text-gray-300 bg-gray-800/50 border border-gray-700 rounded-lg py-2 px-3">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 gap-2 shadow-lg hover:shadow-white/20 transition-all duration-300 group">
                  <GitBranch className="h-5 w-5" />
                  Connect GitHub Account
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button className="text-white border border-gray-600 hover:border-purple-400 hover:text-purple-300 bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}