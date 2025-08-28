import React from "react";

const reviewsLeft = [
  { id: 1, name: "Mentor", text: "Perfect tool for beginners to plan their projects step by step." },
  { id: 2, name: "Student Dev", text: "Helped me visualize deployment flowcharts so easily!" },
  { id: 3, name: "CoderX", text: "Makes communication in small dev teams much smoother." },
];

const reviewsMiddle = [
  { id: 1, name: "Anjali", text: "Loved how it suggested tech stacks based on my project idea." },
  { id: 2, name: "Rahul", text: "Automated testing built-in? That's a lifesaver for beginners." },
  { id: 3, name: "Karan", text: "I could deploy and cross-check changes live. Amazing!" },
];

const reviewsRight = [
  { id: 1, name: "Priya", text: "Clean interface, kept my code structured and documented." },
  { id: 2, name: "Vikram", text: "Collaboration features made my college project shine." },
  { id: 3, name: "Sanya", text: "Beginner-friendly but powerful enough for advanced devs." },
];

function ReviewCard({ name, text }) {
  return (
    <div className="relative w-full sm:w-[350px] md:w-[380px] lg:w-[420px] mx-auto select-none group">
      <div className="relative bg-gradient-to-b from-gray-900/70 to-gray-800/70 backdrop-blur-sm 
                      rounded-2xl p-6 sm:p-8 text-center 
                      border border-gray-700 hover:border-cyan-400/50 transition-all duration-300 shadow-xl
                      group-hover:shadow-cyan-400/10 group-hover:shadow-lg">
        {/* accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
        
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4">{text}</p>
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-cyan-400">— {name}</span>
        
        {/* hover glow */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
             style={{ boxShadow: 'inset 0 0 16px rgba(0,255,255,0.08)' }} />
      </div>
    </div>
  );
}

function VerticalMarquee({ direction = "up", speed = 18, items }) {
  const dirClass = direction === "up" ? "marquee-up" : "marquee-down";
  return (
    <div className="relative overflow-hidden h-[350px] sm:h-[400px] md:h-[500px] w-full">
      {/* fade masks */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20 z-20 bg-gradient-to-b from-[#070912] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 z-20 bg-gradient-to-t from-[#070912] to-transparent" />

      {/* scrolling track */}
      <div
        className={`marquee-track ${dirClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-group">
          {items.map((r) => (
            <ReviewCard key={`A-${r.id}`} name={r.name} text={r.text} />
          ))}
        </div>
        <div className="marquee-group" aria-hidden>
          {items.map((r) => (
            <ReviewCard key={`B-${r.id}`} name={r.name} text={r.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ThreeMarquees() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 relative">
      {/* subtle grid pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* radial gradient */}
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(0,180,216,0.1)_0%,transparent_70%)]" />

      {/* 🏷️ Heading */}
      <div className="relative z-10 text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          What Developers Say
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto">
          Real experiences from students, mentors, and devs using our platform.
        </p>
      </div>

      {/* Three columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 max-w-[1400px] mx-auto w-full">
        <VerticalMarquee direction="up" speed={20} items={reviewsLeft} />
        <VerticalMarquee direction="down" speed={24} items={reviewsMiddle} />
        <VerticalMarquee direction="up" speed={22} items={reviewsRight} />
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }
        @keyframes scroll-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes scroll-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .marquee-up   { animation-name: scroll-up; }
        .marquee-down { animation-name: scroll-down; }
      `}</style>
    </div>
  );
}
