// Get reCAPTCHA keys from: https://www.google.com/recaptcha/admin

export const RECAPTCHA_CONFIG = {
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  // Default actions for different forms
  actions: {
    contact: 'contact_form',
    join: 'join_form',
    register: 'register_form',
    inquire: 'inquire_form',
    download: 'download_form',
  },
} as const

// Validation function
export const validateRecaptchaConfig = () => {
  if (!RECAPTCHA_CONFIG.siteKey) {
    console.warn('reCAPTCHA site key is not configured. Please add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to your environment variables.')
    return false
  }
  return true
}
