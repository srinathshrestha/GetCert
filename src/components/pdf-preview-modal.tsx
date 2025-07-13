'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Download, Eye, Loader2, AlertCircle } from 'lucide-react'

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl?: string | null; // URL for preview display
  studentName?: string;
  onDownload?: () => void;
}

export function PDFPreviewModal({ 
  isOpen, 
  onClose, 
  downloadUrl, 
  studentName,
  onDownload 
}: PDFPreviewModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen && downloadUrl) {
      setIsLoading(true)
      setError(null)
    }
  }, [isOpen, downloadUrl])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setError('Failed to load PDF preview')
  }

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank')
      if (onDownload) {
        onDownload()
      }
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-border bg-card h-full">
            {/* Header */}
            <CardHeader className="border-b border-border py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>Certificate Preview</span>
                  {studentName && (
                    <span className="text-sm font-normal text-muted-foreground">
                      - {studentName}
                    </span>
                  )}
                </CardTitle>
                
                <div className="flex items-center space-x-2">
                  {downloadUrl && (
                    <Button
                      onClick={handleDownload}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="p-0 h-[calc(90vh-120px)] relative">
              {!downloadUrl ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No PDF available for preview</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Loading State */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading PDF preview...</p>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="text-center">
                        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                        <p className="text-destructive font-medium mb-2">Preview Error</p>
                        <p className="text-muted-foreground mb-4">{error}</p>
                        <Button
                          onClick={handleDownload}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Directly
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* PDF Iframe */}
                  <iframe
                    src={`${downloadUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full border-0"
                    title="Certificate Preview"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
} 