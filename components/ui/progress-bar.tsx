'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Download, CheckCircle } from 'lucide-react'

interface ProgressBarProps {
  progress: number
  isVisible: boolean
  message?: string
  className?: string
}

export default function ProgressBar({ 
  progress, 
  isVisible, 
  message = 'Preparing brochure for download...',
  className 
}: ProgressBarProps) {
  if (!isVisible) return null

  const isComplete = progress >= 100

  return (
    <div className={cn(
      "w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-100",
      className
    )}>
      <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className={cn(
          "w-8 h-8 sm:w-10 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
          isComplete 
            ? "bg-green-100 text-green-600" 
            : "bg-blue-100 text-blue-600"
        )}>
          {isComplete ? (
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Download className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 truncate">
            {isComplete ? 'Download Complete!' : message}
          </h4>
          <p className="text-xs text-gray-600 hidden sm:block">
            {isComplete ? 'Your brochure is ready' : 'Please wait while we prepare your brochure...'}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <span className="text-sm sm:text-lg font-bold text-blue-600">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out relative",
              isComplete 
                ? "bg-gradient-to-r from-green-400 to-green-500" 
                : "bg-gradient-to-r from-[#314EA9] to-[#446AE1]"
            )}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
