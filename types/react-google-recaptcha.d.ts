declare module 'react-google-recaptcha' {
  import { Component, Ref } from 'react'

  export interface ReCAPTCHAProps {
    sitekey: string
    onChange?: (token: string | null) => void
    onExpired?: () => void
    onErrored?: (error: any) => void
    theme?: 'light' | 'dark'
    size?: 'compact' | 'normal' | 'invisible'
    hl?: string
    ref?: Ref<ReCAPTCHA>
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void
    execute(): void
    getValue(): string | null
  }
}
