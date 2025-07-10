"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Loader2,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CertificateFormProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  college: string;
  email: string;
  termsAccepted: boolean;
}

interface FormErrors {
  name?: string;
  college?: string;
  email?: string;
  termsAccepted?: string;
}

interface ProcessingState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
  downloadUrl: string | null;
}

export function CertificateForm({ onBack }: CertificateFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    college: "",
    email: "",
    termsAccepted: false,
  });

  const [processing, setProcessing] = useState<ProcessingState>({
    isLoading: false,
    success: false,
    error: null,
    downloadUrl: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate form data
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.college.trim()) {
      errors.college = "College name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous states
    setProcessing({
      isLoading: false,
      success: false,
      error: null,
      downloadUrl: null,
    });

    if (!validateForm()) {
      return;
    }

    setProcessing((prev) => ({ ...prev, isLoading: true }));

    try {
      // Call the API to generate certificate
      const response = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          college: formData.college.trim(),
          email: formData.email.toLowerCase().trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate certificate");
      }

      // Success - certificate generated
      setProcessing({
        isLoading: false,
        success: true,
        error: null,
        downloadUrl: data.downloadUrl,
      });
    } catch (error) {
      console.error("Certificate generation error:", error);
      setProcessing({
        isLoading: false,
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        downloadUrl: null,
      });
    }
  };

  // Handle input changes
  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {!processing.success ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    Generate Your Certificate
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Please provide your details to verify and generate your
                    internship certificate
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        className={`${
                          formErrors.name
                            ? "border-destructive"
                            : "border-border"
                        }`}
                      />
                      {formErrors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-destructive"
                        >
                          {formErrors.name}
                        </motion.p>
                      )}
                    </div>

                    {/* College Field */}
                    <div className="space-y-2">
                      <Label htmlFor="college" className="text-foreground">
                        College/University
                      </Label>
                      <Input
                        id="college"
                        type="text"
                        placeholder="Enter your college or university name"
                        value={formData.college}
                        onChange={(e) =>
                          handleInputChange("college", e.target.value)
                        }
                        className={`${
                          formErrors.college
                            ? "border-destructive"
                            : "border-border"
                        }`}
                      />
                      {formErrors.college && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-destructive"
                        >
                          {formErrors.college}
                        </motion.p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`${
                          formErrors.email
                            ? "border-destructive"
                            : "border-border"
                        }`}
                      />
                      {formErrors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-destructive"
                        >
                          {formErrors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Terms Checkbox */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) =>
                            handleInputChange(
                              "termsAccepted",
                              checked as boolean
                            )
                          }
                          className="border-border"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-foreground cursor-pointer"
                        >
                          I accept the{" "}
                          <button
                            type="button"
                            className="text-primary hover:underline"
                            onClick={() => {
                              // Open terms modal or new tab
                              window.open("/terms", "_blank");
                            }}
                          >
                            terms and conditions
                          </button>
                        </Label>
                      </div>
                      {formErrors.termsAccepted && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="text-sm text-destructive"
                        >
                          {formErrors.termsAccepted}
                        </motion.p>
                      )}
                    </div>

                    {/* Error Display */}
                    {processing.error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                      >
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-destructive" />
                          <p className="text-sm text-destructive font-medium">
                            {processing.error}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={processing.isLoading || !formData.termsAccepted}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
                    >
                      {processing.isLoading ? (
                        <motion.div
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Generating your certificate...</span>
                        </motion.div>
                      ) : (
                        "Generate Certificate"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-border bg-card/50 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6"
                  >
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-foreground mb-4"
                  >
                    Certificate Ready!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-muted-foreground mb-8"
                  >
                    Your internship certificate has been generated successfully.
                    Click the button below to download it.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button
                      onClick={() => {
                        if (processing.downloadUrl) {
                          window.open(processing.downloadUrl, "_blank");
                        }
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold hover:scale-105 transition-transform"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Certificate
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-muted-foreground mt-6"
                  >
                    Download link expires in 1 hour for security purposes
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
