"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  FileCheck,
  FileX,
  TrendingUp,
  LogOut,
  RefreshCw,
  Calendar,
  GraduationCap,
  Shield,
} from "lucide-react";

interface AdminStats {
  totalInterns: number;
  internsWithCertificates: number;
  internsWithoutCertificates: number;
  recentCertificates: number;
  completionRate: number;
  fieldBreakdown: Array<{
    field: string;
    count: number;
  }>;
  recentInterns: Array<{
    id: number;
    name: string;
    college: string;
    email: string;
    field: string;
    startDate: string;
    endDate: string;
    hasCertificate: boolean;
  }>;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await fetch("/api/admin/stats");
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Session expired, logout
          onLogout();
          return;
        }
        throw new Error(data.error || "Failed to fetch statistics");
      }

      setStats(data.data);
    } catch (error) {
      console.error("❌ Error fetching stats:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      onLogout();
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <Card className="border-border bg-card/80 backdrop-blur-sm shadow-xl p-8">
          <div className="flex items-center space-x-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="text-lg text-foreground">
              Loading dashboard...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center">
        <Card className="border-border bg-card/80 backdrop-blur-sm shadow-xl p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="flex space-x-3">
              <Button
                onClick={() => fetchStats()}
                className="bg-primary hover:bg-primary/90"
              >
                Try Again
              </Button>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Certificate generation statistics and activity monitoring
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={() => fetchStats(true)}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
            >
              {isRefreshing ? (
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </Button>

            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Interns */}
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Interns
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats?.totalInterns || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Generated */}
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Certificates Generated
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats?.internsWithCertificates || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <FileCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Certificates */}
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Pending Certificates
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats?.internsWithoutCertificates || 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <FileX className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completion Rate
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stats?.completionRate || 0}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Field Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>Certificates by Field</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.fieldBreakdown.map((item) => (
                    <div
                      key={item.field}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {item.field}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div
                            className="h-2 bg-primary rounded-full transition-all duration-500"
                            style={{
                              width: `${
                                (item.count /
                                  (stats?.internsWithCertificates || 1)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-8">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Recent Interns</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentInterns.slice(0, 5).map((intern) => (
                    <div
                      key={intern.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {intern.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {intern.college}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {intern.field}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            intern.hasCertificate
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                          }`}
                        >
                          {intern.hasCertificate
                            ? "Certificate Generated"
                            : "Pending"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
