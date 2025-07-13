"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  ArrowLeft,
  SearchX,
  Home,
  Sparkles,
  FileX,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main 404 Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12"
          >
            {/* Animated 404 Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 200,
              }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-8 relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FileX className="w-16 h-16 text-primary" />
              </motion.div>

              {/* Floating sparkles */}
              <motion.div
                animate={{
                  y: [-20, -30, -20],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-2 right-2"
              >
                <Sparkles className="w-4 h-4 text-primary/60" />
              </motion.div>

              <motion.div
                animate={{
                  y: [-15, -25, -15],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-3 left-3"
              >
                <Sparkles className="w-3 h-3 text-primary/40" />
              </motion.div>
            </motion.div>

            {/* 404 Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-8xl md:text-9xl font-bold text-primary mb-4 tracking-tight"
            >
              404
            </motion.h1>

            {/* Main heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Oops! Page Not Found
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              The page you&apos;re looking for seems to have gone on an
              unexpected adventure. Don&apos;t worry though - let&apos;s get you
              back to generating those certificates!
            </motion.p>
          </motion.div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {/* Go Home Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="border-border bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <Home className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Go Home
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Return to the homepage and start generating certificates
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Generate Certificate Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card
                className="border-border bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push("/?action=generate")}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Generate Certificate
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Skip the wait and go directly to certificate generation
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Search Alternative Card */}
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="border-border bg-card/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <SearchX className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    What you might be looking for
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Check if the URL is correct or contact support for help
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform min-w-[180px]"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>

            <Button
              onClick={() => router.push("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform min-w-[180px]"
            >
              <Home className="w-5 h-5 mr-2" />
              Take Me Home
            </Button>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 p-6 rounded-lg bg-primary/5 border border-primary/20 max-w-2xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-3"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Did you know?
            </h3>
            <p className="text-muted-foreground">
              Over <span className="font-semibold text-primary">{240}+</span>{" "}
              students have already generated their certificates through our
              platform! Join them by heading back to the homepage.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
