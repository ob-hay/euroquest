'use client'

import React, { useEffect, useState } from 'react'
import { CheckCircle, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SuccessMessageProps {
  isVisible: boolean
  onClose: () => void
  message?: string
  fileName?: string
  className?: string
}

export default function SuccessMessage({ 
  isVisible, 
  onClose, 
  message = 'Brochure downloaded successfully!',
  fileName,
  className 
}: SuccessMessageProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true)
      // Auto close after 4 seconds
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setTimeout(onClose, 300) // Wait for animation to complete
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className={cn(
      "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm",
      className
    )}>
      <div className={cn(
        "bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all duration-300",
        isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
      )}>
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {message}
          </h3>

          {fileName && (
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
              <Download className="w-4 h-4" />
              <span className="truncate">{fileName}</span>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => {
              setIsAnimating(false)
              setTimeout(onClose, 300)
            }}
            className="w-full bg-gradient-to-r from-[#314EA9] to-[#446AE1] text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
