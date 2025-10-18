'use client'

import React, { useState, useEffect } from 'react'
import { X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import PhoneInput from '@/components/ui/phone-input'
import { useInquireForm } from '@/services/forms/forms-hooks'
import ReCaptchaV2 from '@/components/ui/recaptcha-v2'
import { RECAPTCHA_CONFIG, validateRecaptchaConfig } from '@/constants/recaptcha'
import { usePopupStore } from '@/store/popup-store'
import { useAlert } from '@/hooks/useAlert'

interface InquireFormData {
  fullName: string
  email: string
  phoneNumber: string
  company: string
  city: string
  country: string
  message: string
  timingId?: string
}

export default function InquirePopup() {
  const { isInquireOpen, inquireData, closeInquire } = usePopupStore();
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const { courseTitle = '', timingId = '' } = inquireData;
  const [formData, setFormData] = useState<InquireFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    company: '',
    city: '',
    country: '',
    message: '',
    timingId: timingId
  })
  const [errors, setErrors] = useState<Partial<InquireFormData>>({})
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [recaptchaVerified, setRecaptchaVerified] = useState(false)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  
  // Use the inquire form mutation
  const inquireMutation = useInquireForm()

  // Check if reCAPTCHA is configured
  const isRecaptchaConfigured = validateRecaptchaConfig()

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isInquireOpen) {
        closeInquire()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isInquireOpen, closeInquire])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isInquireOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isInquireOpen])

  const handleInputChange = (field: keyof InquireFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handlePhoneChange = (value: string) => {
    handleInputChange('phoneNumber', value)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<InquireFormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    // City is not required in the original template
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token)
    setRecaptchaVerified(true)
  }

  const handleRecaptchaError = (error: any) => {
    console.error('reCAPTCHA error:', error)
    setRecaptchaVerified(false)
    setRecaptchaToken(null)
    showErrorAlert('Error!', 'reCAPTCHA verification failed. Please try again.')
  }

  const handleRecaptchaExpire = () => {
    setRecaptchaVerified(false)
    setRecaptchaToken(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Check reCAPTCHA only if it's configured
    if (isRecaptchaConfigured && !recaptchaVerified) {
      showErrorAlert('Error!', 'Please complete the reCAPTCHA verification')
      return
    }

    // Prepare data for API
    const apiData = {
      full_name: formData.fullName,
      mobile: formData.phoneNumber,
      email: formData.email,
      timing_id: parseInt(formData.timingId || '0') || 0,
      company: formData.company,
      country: formData.country,
      city: formData.city,
      message: formData.message,
      ...(isRecaptchaConfigured && recaptchaToken && { recaptcha_token: recaptchaToken }),
    }

    try {
      await inquireMutation.mutateAsync(apiData)
      
      showSuccessAlert('Inquiry Sent Successfully!', 'Thank you for your inquiry! We will get back to you soon.')
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        company: '',
        city: '',
        country: '',
        message: '',
        timingId: timingId
      })
      setRecaptchaVerified(false)
      setRecaptchaToken(null)
      closeInquire()
    } catch (error) {
      showErrorAlert('Error!', 'There was an error sending your inquiry. Please try again.')
    }
  }

  if (!isInquireOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeInquire()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:items-start max-md:pt-8 max-md:p-2"
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full max-w-[1152px] rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg">
        
        {/* Close Button */}
        <button
          onClick={closeInquire}
          className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="register-modal flex flex-col h-full max-h-full">
          {/* Right Section - Inquire Form */}
          <div className="register-right flex-1 p-4 md:p-6 overflow-y-auto rounded-lg max-md:p-3">
            
            {/* Header */}
            <div className="register-header mb-8 max-md:mb-6">
              <h3 className="text-[#3E5EC0] text-xl font-bold mb-2 max-md:text-lg">
                {courseTitle || 'Course Inquiry'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="form-inputs flex flex-col gap-4">
              {/* Form Grid */}
              <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                {/* Full Name */}
                <div className="form-group flex flex-col gap-1">
                  <label htmlFor="inquire_full_name" className="text-[13px] text-[#333]">Full Name</label>
                  <input
                    type="text"
                    id="inquire_full_name"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={cn(
                      "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                      errors.fullName && "border-red-500"
                    )}
                    required
                  />
                  {errors.fullName && <span className="text-red-500 text-xs">{errors.fullName}</span>}
                </div>

                {/* Email */}
                <div className="form-group flex flex-col gap-1">
                  <label htmlFor="inquire_email" className="text-[13px] text-[#333]">Email</label>
                  <input
                    type="email"
                    id="inquire_email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn(
                      "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                      errors.email && "border-red-500"
                    )}
                    required
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <PhoneInput
                  id="phone3"
                  name="mobile"
                  label="Phone Number"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  onValidationChange={setIsPhoneValid}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  required
                  defaultCountry="US"
                />

                {/* Company */}
                <div className="form-group flex flex-col gap-1">
                  <label htmlFor="inquire_company" className="text-[13px] text-[#333]">Company</label>
                  <input
                    type="text"
                    id="inquire_company"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={cn(
                      "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                      errors.company && "border-red-500"
                    )}
                    required
                  />
                  {errors.company && <span className="text-red-500 text-xs">{errors.company}</span>}
                </div>

                {/* City */}
                <div className="form-group flex flex-col gap-1">
                  <label htmlFor="inquire_city" className="text-[13px] text-[#333]">City</label>
                  <input
                    type="text"
                    id="inquire_city"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={cn(
                      "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                      errors.city && "border-red-500"
                    )}
                  />
                  {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
                </div>

                {/* Country */}
                <div className="form-group flex flex-col gap-1">
                  <label htmlFor="inquire_country" className="text-[13px] text-[#333]">Country</label>
                  <input
                    type="text"
                    id="inquire_country"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={cn(
                      "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                      errors.country && "border-red-500"
                    )}
                    required
                  />
                  {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
                </div>
              </div>

              {/* Message */}
              <div className="form-group message-group flex flex-col gap-1">
                <label htmlFor="inquire_message" className="text-[13px] text-[#333]">Message</label>
                <textarea
                  id="inquire_message"
                  name="message"
                  placeholder="your message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={cn(
                    "w-full min-h-[120px] px-4 py-3 border border-[#e2e8f0] rounded-xl outline-none resize-none text-sm transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 placeholder:text-[#6F6F6F] max-md:min-h-[100px] max-md:px-3 max-md:py-2",
                    errors.message && "border-red-500"
                  )}
                  required
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message}</span>}
              </div>

              {/* Hidden timing ID */}
              <input type="hidden" name="timing_id" value={timingId} />

              {/* Submit Section */}
              <div className="form-submition flex items-center justify-between gap-8 max-md:flex-col-reverse max-md:gap-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!recaptchaVerified || inquireMutation.isPending || !isPhoneValid}
                  className="submit-btn min-w-[170px] w-fit h-12 rounded-[10px] px-[18px] text-sm font-semibold text-white bg-gradient-to-r from-[#314EA9] to-[#446AE1] border-none cursor-pointer flex items-center justify-center gap-2 ml-0 transition-all duration-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed max-md:w-full max-md:min-w-auto max-md:h-11 max-md:text-[13px]"
                >
                  <span className="btn-text">{inquireMutation.isPending ? 'Sending Message...' : 'Send Message'}</span>
                  {!inquireMutation.isPending && <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />}
                </button>

                {/* reCAPTCHA v2 */}
                <ReCaptchaV2
                  onVerify={handleRecaptchaVerify}
                  onError={handleRecaptchaError}
                  onExpire={handleRecaptchaExpire}
                  theme="light"
                  size="normal"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
