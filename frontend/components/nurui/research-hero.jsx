// ResearchHero.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./../nurui/button.jsx";
import { FileText, Sparkles, Check } from "lucide-react";
import { FloatingPaper } from "./../nurui/floating-paper.jsx";
import { RoboAnimation } from "./../nurui/robo-animation.jsx";
import { useNavigate } from "react-router-dom";
import { Flip } from "./../Flip.jsx"; // import your flip component at the top

// ...

export default function ResearchHero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <section className="relative container mx-auto px-6 pt-20 pb-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <LeftContent />
          <SuperInteractiveRightSide />
        </div>
      </section>
    </div>
  );
}

// ---------------- LEFT SIDE WITH PARALLAX ---------------- //

function LeftContent() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const calcParallax = (factor) => ({
    x: (mouse.x - window.innerWidth / 2) / factor,
    y: (mouse.y - window.innerHeight / 2) / factor,
  });

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-wide uppercase text-gray-300"
        style={{ transform: `translate(${calcParallax(60).x}px, ${calcParallax(60).y}px)` }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Built for beginners, designed for production
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay: 0.1 }}
        className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
        style={{ transform: `translate(${calcParallax(40).x}px, ${calcParallax(40).y}px)` }}
      >
        <Flip /> First.
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {" "}Ship Production-Ready
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.1 }}
        className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl"
        style={{
          transform: `translate(${calcParallax(50).x}px, ${
            calcParallax(50).y
          }px)`,
        }}
      >
        Turn your problem statement into an editable flowchart and a justified
        tech stack. Follow a clear track —{" "}
        <span className="text-white font-semibold">
          Plan → Code → Test → Deploy
        </span>{" "}
        — with readable code, live documentation, refactor nudges, and preview
        deploys.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        style={{
          transform: `translate(${calcParallax(70).x}px, ${
            calcParallax(70).y
          }px)`,
        }}
      >
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 flex items-center cursor-pointer transition"
          onClick={() => navigate("/prompt")}
        >
          <FileText className="mr-2 h-5 w-5" />
          Describe Your Problem
        </Button>
        <Button
          variant="outline"
          className="text-white border-purple-500 hover:bg-purple-500/20 cursor-pointer transition"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Sample Flowchart
        </Button>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-400">
        <Check className="h-4 w-4 text-purple-300" /> Docs as you code
        <Check className="h-4 w-4 text-purple-300" /> Refactor suggestions
        <Check className="h-4 w-4 text-purple-300" /> Preview deploys
      </div>
    </div>
  );
}

// ---------------- SUPER INTERACTIVE RIGHT SIDE ---------------- //

const rightVariants = ["aiBrain", "workshop", "flowchart", "cosmicGlobe"];

function SuperInteractiveRightSide() {
  const [current, setCurrent] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % rightVariants.length);
    }, 7000);

    const handleMouse = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] flex justify-center items-center">
      <AnimatePresence mode="wait">
        {rightVariants.map((variant, idx) =>
          idx === current ? (
            <motion.div
              key={variant}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute w-full h-full flex justify-center items-center"
            >
              {variant === "aiBrain" && <InteractiveAIBrain mouse={mouse} />}
              {variant === "workshop" && <InteractiveWorkshop mouse={mouse} />}
              {variant === "flowchart" && (
                <InteractiveFlowchart mouse={mouse} />
              )}
              {variant === "cosmicGlobe" && (
                <InteractiveCosmicGlobe mouse={mouse} />
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- ROBOT SPEECH ---------------- //

function RobotSpeech({ text }) {
  return (
    <div className="absolute -bottom-6 -right-6 w-44 h-44 pointer-events-none flex justify-end items-end">
      <RoboAnimation />
      <div
        className="absolute -top-4 right-14 bg-gradient-to-r from-purple-600/60 to-pink-500/60 
                      backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg
                      border border-white/20"
      >
        {text}
      </div>
    </div>
  );
}

// ---------------- INTERACTIVE COMPONENTS ---------------- //

function InteractiveAIBrain({ mouse }) {
  return (
    <div className="relative w-72 h-72 flex justify-center items-center">
      <motion.div
        className="absolute w-full h-full rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-25 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, Math.random() * 20 - 10 + mouse.x / 50, 0],
            y: [0, Math.random() * 20 - 10 + mouse.y / 50, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-3 h-3 rounded-full bg-white shadow-lg"
          style={{ top: `${15 + i * 8}%`, left: `${15 + i * 8}%` }}
        />
      ))}
      <RobotSpeech text="Analyzing your problem…" />
    </div>
  );
}

function InteractiveWorkshop({ mouse }) {
  return (
    <div className="relative w-full h-full flex justify-center items-center bg-black/20 rounded-3xl overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 5 + mouse.x / 100, 0],
            y: [0, -25 - i * 3 + mouse.y / 50, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-6 h-6 bg-purple-500/70 rounded-sm shadow-lg"
          style={{ top: `${10 + i * 12}%`, left: `${15 + i * 10}%` }}
        />
      ))}
      <RobotSpeech text="Building your solution…" />
    </div>
  );
}

function InteractiveFlowchart({ mouse }) {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: [1, 1.1, 1],
            y: [0, -10 - mouse.y / 100, 0],
          }}
          transition={{
            delay: i * 0.25,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute w-8 h-8 bg-purple-500 rounded-full shadow-lg cursor-pointer hover:scale-110"
          style={{ top: `${15 + i * 15}%`, left: `${20 + i * 12}%` }}
        />
      ))}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
          }}
          transition={{
            delay: i * 0.3,
            duration: 0.6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute h-[2px] bg-pink-400 origin-left rounded"
          style={{
            top: `${19 + i * 15}%`,
            left: `${23 + i * 12}%`,
            width: "60px",
          }}
        />
      ))}
      <RobotSpeech text="Connecting the dots…" />
    </div>
  );
}

function InteractiveCosmicGlobe({ mouse }) {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="w-56 h-56 rounded-full border-2 border-purple-500/30 flex justify-center items-center"
      >
        {[...Array(6)].map((_, i) => {
          const offsetX = (mouse.x / window.innerWidth - 0.5) * 20;
          const offsetY = (mouse.y / window.innerHeight - 0.5) * 20;
          return (
            <motion.div
              key={i}
              animate={{
                rotate: [0, 360, 0],
                x: [0, Math.random() * 6 - 3 + offsetX, 0],
                y: [0, Math.random() * 6 - 3 + offsetY, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-3 h-3 bg-pink-400 rounded-full shadow-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          );
        })}
      </motion.div>

      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 blur-3xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <RobotSpeech text="Ideas orbiting in space…" />
    </div>
  );
}
