"use client";

import { motion } from "framer-motion";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";
import { GraduationCap, Zap } from "lucide-react";

// Header component with LinkVerse branding and dark mode toggle
// Provides consistent navigation and branding across the app
export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* LinkVerse Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            {/* Company Logo */}
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>

            {/* Company Name */}
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                get<span className="text-primary">Cert</span>
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                by Link<span className="text-primary text-xs">Verse</span> Labs
              </p>
            </div>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DarkModeToggle />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
