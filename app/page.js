"use client";

import { useState } from "react";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import ToolsCarousel from "@/components/landing/ToolsCarousel";
import UseCases from "@/components/landing/UseCases";
import Footer from "@/components/landing/Footer";
import SignupModal from "@/components/landing/SignupModal";

export default function Page() {
  const [signup, setSignup] = useState(false);
  const open = () => setSignup(true);
  return (
    <>
      <main>
        <Hero onSignup={open} />
        <HowItWorks />
        <ToolsCarousel />
        <UseCases onSignup={open} />
      </main>
      <Footer onSignup={open} />
      <SignupModal open={signup} onClose={() => setSignup(false)} />
    </>
  );
}
