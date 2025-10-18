'use client'

import React, { useRef, useCallback, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { RECAPTCHA_CONFIG } from '@/constants/recaptcha'

interface ReCaptchaV2Props {
  onVerify: (token: string) => void
  onError?: (error: any) => void
  onExpire?: () => void
  className?: string
  theme?: 'light' | 'dark'
  size?: 'compact' | 'normal' | 'invisible'
}

export default function ReCaptchaV2({ 
  onVerify, 
  onError, 
  onExpire,
  className = '',
  theme = 'light',
  size = 'normal'
}: ReCaptchaV2Props) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const handleVerify = useCallback((token: string | null) => {
    if (token) {
      onVerify(token)
    } else {
      onError?.(new Error('reCAPTCHA verification failed'))
    }
  }, [onVerify, onError])

  const handleExpire = useCallback(() => {
    onExpire?.()
  }, [onExpire])

  const handleError = useCallback((error: any) => {
    console.error('reCAPTCHA error:', error)
    onError?.(error)
  }, [onError])

  // If reCAPTCHA is not configured, return a mock component
  if (!RECAPTCHA_CONFIG.siteKey) {
    return (
      <div className={`recaptcha-mock ${className}`}>
        <div className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
          <input
            type="checkbox"
            id="recaptcha-mock"
            onChange={(e) => {
              if (e.target.checked) {
                onVerify('mock-token')
              }
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="recaptcha-mock" className="text-sm text-gray-700">
            I'm not a robot (Mock reCAPTCHA)
          </label>
        </div>
      </div>
    )
  }

  return (
    <div className={`recaptcha-v2-container ${className}`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        // sitekey="6LezvtMrAAAAAD6czyI91m_cAMcGYZtQp4BN8hGW"
        sitekey="6LeMxdMrAAAAALts50DURorRFtZwdISrVIbSg-8b"
        onChange={handleVerify}
        onExpired={handleExpire}
        onErrored={handleError}
        theme={theme}
        size={size}
        hl="en" // Language
      />
    </div>
  )
}

// Hook for using reCAPTCHA v2 in forms
export function useReCaptchaV2() {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  const verify = useCallback((recaptchaToken: string | null) => {
    if (recaptchaToken) {
      setToken(recaptchaToken)
      setIsVerified(true)
      return recaptchaToken
    } else {
      setIsVerified(false)
      setToken(null)
      return null
    }
  }, [])

  const reset = useCallback(() => {
    setIsVerified(false)
    setToken(null)
    recaptchaRef.current?.reset()
  }, [])

  const execute = useCallback(() => {
    recaptchaRef.current?.execute()
  }, [])

  return {
    recaptchaRef,
    verify,
    reset,
    execute,
    isVerified,
    token,
  }
}
