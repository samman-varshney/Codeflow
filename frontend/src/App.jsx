import { Routes, Route } from "react-router-dom";
import HowItWorks from "../components/HowItWorks.jsx";
import ResearchHero from "../components/nurui/research-hero.jsx";
import { SparklesCore } from "../components/nurui/sparkles.jsx";
import FeaturesSection from "../components/FeaturesSection.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Prompt from "../pages/Prompt.jsx"
import Contributors from "../components/Contributors.jsx";
import Review from "../components/Review.jsx";
import Github from "../components/GitHub.jsx";


export default function App() {
  return (
    <Routes>
      
      <Route
        path="/"
        element={
          <section className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="fixed inset-0 z-0 w-full h-full pointer-events-none"
              particleColor="#FFFFFF"
            />
            <nav className="fixed top-0 w-full shadow-md z-50">
              <Navbar />
            </nav>

            <div className="relative z-10">
              <ResearchHero />
              <FeaturesSection />
              <HowItWorks />
              <Contributors/>
              {/* <Github/> */}
              <Review/>
            </div>
            <footer>
              <Footer />
            </footer>
          </section>
        }
      />

      
      <Route path="/prompt" element={<Prompt />} />
    </Routes>
  );
}
