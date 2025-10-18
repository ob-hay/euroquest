import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'outline'
  inputSize?: 'sm' | 'md' | 'lg'
  error?: boolean
  helperText?: string
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  suppressHydrationWarning?: boolean
}

const inputVariants = {
  default: 'border-2 border-slate-200 bg-white focus:border-blue-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
  outline: 'border border-gray-300 bg-transparent focus:border-blue-500'
}

const inputSizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-4 text-base'
}

export default function Input({
  variant = 'default',
  inputSize = 'md',
  error = false,
  helperText,
  label,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className,
  suppressHydrationWarning,
  ...props
}: InputProps) {
  const baseStyles = 'rounded-full font-medium text-[#374151] transition-all duration-300 focus:outline-none focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantStyles = inputVariants[variant]
  const sizeStyles = inputSizes[inputSize]
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
  const widthStyles = fullWidth ? 'w-full' : ''
  const iconPaddingLeft = leftIcon ? 'pl-10' : ''
  const iconPaddingRight = rightIcon ? 'pr-10' : ''

  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {leftIcon}
          </div>
        )}
        
        <input
          className={cn(
            baseStyles,
            variantStyles,
            sizeStyles,
            errorStyles,
            widthStyles,
            iconPaddingLeft,
            iconPaddingRight,
            className
          )}
          suppressHydrationWarning={suppressHydrationWarning}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {rightIcon}
          </div>
        )}
      </div>
      
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
