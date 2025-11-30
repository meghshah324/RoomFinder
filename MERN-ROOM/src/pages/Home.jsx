import HowItWorks from "../components/Landing/HowItWorks.jsx";
import Benefits from "../components/Landing/Benefits.jsx";
import FAQ from "../components/Landing/FAQ.jsx";
import Hero from "../components/Landing/Hero.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero/>
      <HowItWorks/>
      <Benefits/>
      <FAQ/>
    </div>
  );
}
