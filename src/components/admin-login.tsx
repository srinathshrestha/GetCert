'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Loader2, AlertCircle } from 'lucide-react'

interface AdminLoginProps {
  onLoginSuccess: () => void
}

interface LoginState {
  isLoading: boolean
  error: string | null
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [loginState, setLoginState] = useState<LoginState>({
    isLoading: false,
    error: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous error
    setLoginState({ isLoading: true, error: null })

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Login successful
      console.log('✅ Admin login successful')
      setLoginState({ isLoading: false, error: null })
      onLoginSuccess()

    } catch (error) {
      console.error('❌ Admin login error:', error)
      setLoginState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      })
    }
  }

  const handleInputChange = (field: 'username' | 'password', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (loginState.error) {
      setLoginState(prev => ({ ...prev, error: null }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-border bg-card/80 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4"
              >
                <Shield className="w-8 h-8 text-primary" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-foreground">
                Admin Access
              </CardTitle>
              <p className="text-muted-foreground">
                Enter your credentials to access the admin dashboard
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter admin username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="border-border"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="border-border"
                    required
                  />
                </div>

                {/* Error Display */}
                {loginState.error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <p className="text-sm text-destructive font-medium">
                        {loginState.error}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loginState.isLoading || !formData.username || !formData.password}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold"
                >
                  {loginState.isLoading ? (
                    <motion.div
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating...</span>
                    </motion.div>
                  ) : (
                    'Access Dashboard'
                  )}
                </Button>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <p className="text-xs text-muted-foreground">
                  Secure admin access • Session expires in 24 hours
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 