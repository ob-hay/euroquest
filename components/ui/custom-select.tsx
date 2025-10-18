'use client'
import React, { useState, useRef, useEffect } from 'react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

export interface CustomSelectProps {
  value?: string | number
  onValueChange?: (value: string | number) => void
  placeholder?: string
  options?: SelectOption[]
  disabled?: boolean
  className?: string
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'filled'
  fullWidth?: boolean
  error?: boolean
  helperText?: string
  label?: string
  leftIcon?: React.ReactNode
  suppressHydrationWarning?: boolean
}

const sizeClasses = {
  sm: 'h-8 px-3 text-sm',
  default: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base'
}

const variantClasses = {
  default: 'border-gray-200 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
  outline: 'border-gray-300 bg-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/20'
}

export default function CustomSelect({
  value,
  onValueChange,
  placeholder = 'Select an option...',
  options = [],
  disabled = false,
  className,
  size = 'default',
  variant = 'default',
  fullWidth = true,
  error = false,
  helperText,
  label,
  leftIcon,
  suppressHydrationWarning,
  ...props
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(value)
  const selectRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Update selected value when prop changes
  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        setIsOpen(!isOpen)
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        }
        break
    }
  }

  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return
    
    setSelectedValue(option.value)
    onValueChange?.(option.value)
    setIsOpen(false)
  }

  const handleClear = () => {
    setSelectedValue(undefined)
    onValueChange?.("")
    setIsOpen(false)
  }

  // Helper function to compare values with type conversion
  const isValueEqual = (optionValue: string | number, selectedValue: string | number | undefined): boolean => {
    if (selectedValue === undefined || selectedValue === "") return false
    
    // Handle both string and number comparisons
    if (typeof optionValue === 'number' && typeof selectedValue === 'string') {
      return optionValue === Number(selectedValue)
    }
    if (typeof optionValue === 'string' && typeof selectedValue === 'number') {
      return optionValue === selectedValue.toString()
    }
    return optionValue === selectedValue
  }

  const selectedOption = options.find(option => isValueEqual(option.value, selectedValue))
  const displayValue = selectedOption ? selectedOption.label : placeholder

  const baseClasses = cn(
    'flex w-full items-center justify-between gap-2 rounded-full border outline-0 transition-all duration-200',
    'focus-visible:ring-2 focus-visible:ring-blue-500/20',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
    selectedOption && 'border-blue-300',
    fullWidth && 'w-full',
    leftIcon && 'pl-10',
    className
  )

  return (
    <div className={fullWidth ? 'w-full' : 'inline-block'} ref={selectRef}>
      {label && (
        <label className="block text-sm font-semibold text-black mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium z-10">
            {leftIcon}
          </div>
        )}
        
        <button
          ref={triggerRef}
          type="button"
          className={baseClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          suppressHydrationWarning={suppressHydrationWarning}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          {...props}
        >
          <span className={cn(
            'flex-1 text-left truncate',
            !selectedOption ? 'text-gray-900' : 'text-gray-900 font-medium'
          )}>
            {displayValue}
          </span>
          <ChevronDownIcon 
            className={cn(
              'h-4 w-4 opacity-50 transition-transform duration-200',
              isOpen && 'rotate-180'
            )} 
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="p-1">
              {options.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-gray-500">
                  No options available
                </div>
              ) : (
                options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      'relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none',
                      'hover:bg-gray-100 focus:bg-gray-100',
                      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                      option.disabled && 'pointer-events-none opacity-50',
                      isValueEqual(option.value, selectedValue) && 'bg-blue-100 text-blue-700 font-semibold'
                    )}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={isValueEqual(option.value, selectedValue)}
                  >
                    <span className="flex-1 truncate text-start">{option.label}</span>
                    {isValueEqual(option.value, selectedValue) && (
                      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                        <CheckIcon className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
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
