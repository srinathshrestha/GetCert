"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingPage } from "@/components/landing-page";
import { CertificateForm } from "@/components/certificate-form";

type PageState = "landing" | "form";

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState<PageState>("landing");

  const handleGetStarted = () => {
    setCurrentPage("form");
  };

  const handleBackToHome = () => {
    setCurrentPage("landing");
  };

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <LandingPage onGetStarted={handleGetStarted} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <CertificateForm onBack={handleBackToHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
