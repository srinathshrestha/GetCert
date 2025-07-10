"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What do I need to generate my certificate?",
    answer:
      "You need your full name, college/university name, and the email address you used during your internship registration. These details must match our records exactly.",
  },
  {
    question: "What if my email is not found in the system?",
    answer:
      "If your email is not found, it means you're not registered in our internship database. Please contact our support team with your internship details for assistance.",
  },
  {
    question: "Can I download my certificate multiple times?",
    answer:
      "Yes! Once generated, you can request a new download link anytime. The system will recognize existing certificates and provide a fresh download link without regenerating the PDF.",
  },
  {
    question: "How long is the download link valid?",
    answer:
      "Download links are valid for 1 hour for security purposes. After expiration, you can simply request a new link using the same process.",
  },
  {
    question: "What if the details I enter don't match your records?",
    answer:
      "All details (name, college, email) must match exactly with our database. If there's a mismatch, please verify your information or contact support for corrections.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We use SSL encryption for all data transmission, secure cloud storage for certificates, and time-limited download links to ensure maximum security.",
  },
  {
    question: "What format is the certificate in?",
    answer:
      "Certificates are generated as high-quality PDF files with professional formatting, suitable for printing or digital sharing.",
  },
  {
    question: "Can I edit my certificate after generation?",
    answer:
      "Certificates cannot be edited once generated to maintain authenticity. If you need corrections, please contact our support team.",
  },
];

export function FAQSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
          <HelpCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Get quick answers to common questions about the certificate generation
          process
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-border bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-300">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-secondary/20 transition-colors duration-200 rounded-lg"
                >
                  <span className="font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedItems.has(index) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    {expandedItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedItems.has(index) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-border pt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-12 p-6 rounded-lg bg-primary/5 border border-primary/20"
      >
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Still have questions?
        </h3>
        <p className="text-muted-foreground mb-4">
          Can&apos;t find what you&apos;re looking for? Our support team is here
          to help.
        </p>
        <a
          href="mailto:support@example.com"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
        >
          Contact Support
        </a>
      </motion.div>
    </div>
  );
}
