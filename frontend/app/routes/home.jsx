export function meta() {
  return [
    { title: "Shartinary - Rencanakan Perjalananmu dengan Mudah" },
    { name: "description", content: "Platform kurasi rute perjalanan untuk traveler cerdas." },
  ];
}

import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import RecentItineraries from "../components/layout/RecentItineraries";
import Workflow from "../components/layout/Workflow";
import Footer from "../components/layout/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] selection:bg-brand-orange/20">
      <Navbar />
      <main>
        <Hero />
        <RecentItineraries />
        <Workflow />
      </main>
      <Footer />
    </div>
  );
}
