"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "@/components/ui/phone-input";
import { useContactForm } from "@/services/forms/forms-hooks";
import ReCaptchaV2 from "@/components/ui/recaptcha-v2";
import { RECAPTCHA_CONFIG, validateRecaptchaConfig } from "@/constants/recaptcha";
import { usePopupStore } from "@/store/popup-store";
import { useAlert } from "@/hooks/useAlert";

interface ContactFormData {
  fullName: string;
  company: string;
  email: string;
  phoneNumber: string;
  subject: string;
  country: string;
  message: string;
}

export default function ContactPopup() {
  const { isContactOpen, closeContact } = usePopupStore();
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    company: "",
    email: "",
    phoneNumber: "",
    subject: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Use the contact form mutation
  const contactMutation = useContactForm();

  // Check if reCAPTCHA is configured
  const isRecaptchaConfigured = validateRecaptchaConfig();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isContactOpen) {
        closeContact();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isContactOpen, closeContact]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isContactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isContactOpen]);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    handleInputChange("phoneNumber", value);
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    setRecaptchaVerified(true);
  };

  const handleRecaptchaError = (error: any) => {
    // Only log error in development mode
    if (process.env.NODE_ENV === 'development') {
      console.error('reCAPTCHA error:', error);
    }
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
    // Don't show error toast for reCAPTCHA errors to avoid user confusion
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    // Check reCAPTCHA only if it's configured
    if (isRecaptchaConfigured && !recaptchaVerified) {
      showErrorAlert("Please complete the reCAPTCHA verification");
      return;
    }

    // Prepare data for API
    const apiData = {
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      email: formData.email,
      country: formData.country,
      company: formData.company,
      subject: formData.subject,
      message: formData.message,
      ...(isRecaptchaConfigured && recaptchaToken && { recaptcha_token: recaptchaToken }),
    };

    try {
      await contactMutation.mutateAsync(apiData);

      showSuccessAlert(
        "Message Sent Successfully!",
        "Thank you for your message! We will get back to you soon."
      );

      // Reset form
      setFormData({
        fullName: "",
        company: "",
        email: "",
        phoneNumber: "",
        subject: "",
        country: "",
        message: "",
      });
      setRecaptchaVerified(false);
      setRecaptchaToken(null);
      closeContact();
    } catch (error) {
      showErrorAlert(
        "Submission Error",
        "There was an error submitting your message. Please try again."
      );
    }
  };

  if (!isContactOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeContact();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 z-[100] inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:items-start max-md:pt-8 max-md:p-2"
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full max-w-[1152px] rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg">
        {/* Close Button */}
        <button
          onClick={closeContact}
          className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-full">
          {/* Left Side - Contact Info */}
          <div
            className="hidden lg:flex lg:w-[280px] bg-cover bg-center text-white p-4 rounded-lg flex-col justify-between min-h-[250px] gap-6 lg:rounded-l-2xl lg:rounded-r-none lg:min-h-auto"
            style={{ backgroundImage: "url('/assets/images/forms-bg.png')" }}
          >
            <div>
              <h2 className="text-3xl font-black mb-2.5 max-md:text-2xl">
                Contact us
              </h2>
              <p className="text-sm">
                We'd be happy to hear from you. Please fill in the form with
                your details and our team will respond as soon as possible to
                assist with your training needs, course inquiries, or any other
                questions you may have.
              </p>
            </div>

            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:info@euroqst.com"
                  className="text-white no-underline hover:text-blue-200 transition-colors"
                >
                  info@euroqst.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+421915319691"
                  className="text-white no-underline hover:text-blue-200 transition-colors"
                >
                  +421 915 319691
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-white">
                  Šancová 61, Bratislava - Slovakia
                </span>
              </li>
            </ul>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto rounded-lg max-md:p-3">
            <div className="contact-content flex flex-col gap-6 h-full">
              <div className="contact-form-section flex-1">
                <h2 className="hidden max-lg:block text-[22px] font-bold text-[#3E5EC0] mb-3">
                  Contact us
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="contact_full_name"
                        className="text-[13px] text-[#333]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="contact_full_name"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        className={cn(
                          "h-11 text-sm w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.fullName && "border-red-500"
                        )}
                        required
                      />
                      {errors.fullName && (
                        <span className="text-red-500 text-xs">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="contact_company"
                        className="text-[13px] text-[#333]"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="contact_company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.company && "border-red-500"
                        )}
                        required
                      />
                      {errors.company && (
                        <span className="text-red-500 text-xs">
                          {errors.company}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Email - Full Width */}
                    <div className="form-group full-width flex flex-col gap-1">
                      <label
                        htmlFor="contact_email"
                        className="text-[13px] text-[#333]"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="contact_email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.email && "border-red-500"
                        )}
                        required
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone Number - Full Width */}
                    <PhoneInput
                      id="phone1"
                      name="phone_number"
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
                  </div>

                  <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Subject */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="contact_subject"
                        className="text-[13px] text-[#333]"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact_subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.subject && "border-red-500"
                        )}
                        required
                      />
                      {errors.subject && (
                        <span className="text-red-500 text-xs">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Country */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="contact_country"
                        className="text-[13px] text-[#333]"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="contact_country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.country && "border-red-500"
                        )}
                        required
                      />
                      {errors.country && (
                        <span className="text-red-500 text-xs">
                          {errors.country}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="message-group flex flex-col gap-1">
                    <label
                      htmlFor="contact_message"
                      className="text-[13px] text-[#333]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact_message"
                      name="message"
                      placeholder="your message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={cn(
                        "w-full min-h-[120px] px-4 py-3 border border-[#e2e8f0] rounded-xl outline-none resize-none text-sm transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 placeholder:text-[#6F6F6F] max-md:min-h-[100px] max-md:px-3 max-md:py-2",
                        errors.message && "border-red-500"
                      )}
                      required
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Section */}
                  <div className="form-submition flex items-center justify-between gap-8 max-md:flex-col-reverse max-md:gap-4">
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={!recaptchaVerified || contactMutation.isPending || !isPhoneValid}
                      className="submit-btn min-w-[170px] w-fit h-12 rounded-[10px] px-[18px] text-sm font-semibold text-white bg-gradient-to-r from-[#314EA9] to-[#446AE1] border-none cursor-pointer flex items-center justify-center gap-2 ml-0 transition-all duration-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed max-md:w-full max-md:min-w-auto max-md:h-11 max-md:text-[13px]"
                    >
                      <span className="btn-text">
                        {contactMutation.isPending
                          ? "Sending Message..."
                          : "Send Message"}
                      </span>
                      {!contactMutation.isPending && (
                        <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                      )}
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
      </div>
    </div>
  );
}
