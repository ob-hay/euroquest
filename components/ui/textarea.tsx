import React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'outline'
  error?: boolean
  helperText?: string
  label?: string
  fullWidth?: boolean
}

const textareaVariants = {
  default: 'border-2 border-slate-200 bg-white focus:border-blue-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
  outline: 'border border-gray-300 bg-transparent focus:border-blue-500'
}

export default function Textarea({
  variant = 'default',
  error = false,
  helperText,
  label,
  fullWidth = true,
  className,
  ...props
}: TextareaProps) {
  const baseStyles = 'rounded-lg font-medium text-gray-700 transition-all duration-300 focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px] p-4 resize-vertical'
  
  const variantStyles = textareaVariants[variant]
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  const widthStyles = fullWidth ? 'w-full' : ''

  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        className={cn(
          baseStyles,
          variantStyles,
          errorStyles,
          widthStyles,
          className
        )}
        {...props}
      />
      
      {helperText && (
        <p className={cn(
          'mt-1 text-xs',
          error ? 'text-red-500' : 'text-gray-500'
        )}>
          {helperText}
        </p>
      )}
    </div>
  )
}
