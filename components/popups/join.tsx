"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, Upload, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "@/components/ui/phone-input";
import { useJoinForm } from "@/services/forms/forms-hooks";
import ReCaptchaV2 from "@/components/ui/recaptcha-v2";
import { RECAPTCHA_CONFIG, validateRecaptchaConfig } from "@/constants/recaptcha";
import { usePopupStore } from "@/store/popup-store";
import { useAlert } from "@/hooks/useAlert";

interface JoinFormData {
  full_name: string;
  email: string;
  speciality: string;
  country: string;
  phone: string;
  cv: File | null;
  message: string;
  category_id: number;
}

export default function JoinPopup() {
  const { isJoinOpen, closeJoin } = usePopupStore();
  const { showSuccessAlert, showErrorAlert } = useAlert();
  const [formData, setFormData] = useState<JoinFormData>({
    full_name: "",
    email: "",
    speciality: "",
    country: "",
    phone: "",
    cv: null,
    message: "",
    category_id: 1, // Default category ID
  });

  const [fileName, setFileName] = useState("Choose File");
  const [errors, setErrors] = useState<Partial<Record<keyof JoinFormData, string>>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Use the join form mutation
  const joinMutation = useJoinForm();

  // Check if reCAPTCHA is configured
  const isRecaptchaConfigured = validateRecaptchaConfig();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isJoinOpen) {
        closeJoin();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isJoinOpen, closeJoin]);

  const handleInputChange = (
    field: keyof JoinFormData,
    value: string | File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("cv", file);

    if (file) {
      const fileName = file.name;
      if (fileName.length > 20) {
        setFileName(fileName.substring(0, 17) + "...");
      } else {
        setFileName(fileName);
      }
    } else {
      setFileName("Choose File");
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof JoinFormData, string>> = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.speciality.trim()) {
      newErrors.speciality = "Speciality is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isPhoneValid) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.cv) {
      newErrors.cv = "CV file is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!formData.cv) {
      showErrorAlert("Error!", "Please upload your CV");
      return;
    }
    
    // Check reCAPTCHA only if it's configured
    if (isRecaptchaConfigured && !recaptchaVerified) {
      showErrorAlert("Error!", "Please complete the reCAPTCHA verification");
      return;
    }

    // Prepare data for API
    const apiData = {
      full_name: formData.full_name,
      phone_number: formData.phone,
      email: formData.email,
      country: formData.country,
      category_id: formData.category_id,
      cv: formData.cv,
      speciality: formData.speciality,
      message: formData.message,
      ...(isRecaptchaConfigured && recaptchaToken && { recaptcha_token: recaptchaToken }),
    };

    try {
      await joinMutation.mutateAsync(apiData);

      showSuccessAlert(
        "Application Submitted Successfully!",
        "Thank you for your interest! We will review your application and get back to you soon."
      );

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        speciality: "",
        country: "",
        phone: "",
        cv: null,
        message: "",
        category_id: 1,
      });
      setFileName("Choose File");
      setErrors({});
      setRecaptchaVerified(false);
      setRecaptchaToken(null);
      closeJoin();
    } catch (error) {
      showErrorAlert(
        "Submission Error",
        "There was an error submitting your application. Please try again."
      );
    }
  };

  if (!isJoinOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeJoin();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:items-start max-md:pt-8 max-md:p-2"
      onClick={handleOverlayClick}
    >
      {/* Modal Content */}
      <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full max-w-[1152px] rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg">
        {/* Close Button */}
        <button
          onClick={closeJoin}
          className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col lg:flex-row h-full max-h-full">
          {/* Left Side - Join Info */}
          <div
            className="hidden lg:flex lg:w-[280px] bg-cover bg-center text-white p-4 rounded-lg flex-col justify-between min-h-[250px] gap-6 lg:rounded-l-2xl lg:rounded-r-none lg:min-h-auto"
            style={{ backgroundImage: "url('/assets/images/forms-bg.png')" }}
          >
    <div>
              <h2 className="text-3xl font-black mb-2.5 max-md:text-2xl">
                Join us
              </h2>
              <p className="text-sm">
                Be part of EuroQuest International. We are always looking for
                talented professionals who are passionate about training,
                development, and making an impact. Submit your details and
                upload your CV to join our growing team.
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

          {/* Right Side - Join Form */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto rounded-lg max-md:p-3">
            <div className="contact-content flex flex-col gap-6 h-full">
              <div className="join-form-section flex-1">
                <h2 className="hidden max-lg:block text-[22px] font-bold text-[#3E5EC0] mb-3">
                  Join Us
                </h2>

                <form
                  onSubmit={handleSubmit}
                  className="form-inputs flex flex-col gap-4"
                >
                  <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Full Name */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="join_full_name"
                        className="text-[13px] text-[#333]"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="join_full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={(e) =>
                          handleInputChange("full_name", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.full_name && "border-red-500"
                        )}
                        required
                      />
                      {errors.full_name && (
                        <span className="text-red-500 text-xs">
                          {errors.full_name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="join_email"
                        className="text-[13px] text-[#333]"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="join_email"
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
                  </div>

                  <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Speciality */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="join_speciality"
                        className="text-[13px] text-[#333]"
                      >
                        Speciality
                      </label>
                      <input
                        type="text"
                        id="join_speciality"
                        placeholder="Speciality"
                        value={formData.speciality}
                        onChange={(e) =>
                          handleInputChange("speciality", e.target.value)
                        }
                        className={cn(
                          "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
                          errors.speciality && "border-red-500"
                        )}
                        required
                      />
                      {errors.speciality && (
                        <span className="text-red-500 text-xs">
                          {errors.speciality}
                        </span>
                      )}
                    </div>

                    {/* Country */}
                    <div className="form-group flex flex-col gap-1">
                      <label
                        htmlFor="join_country"
                        className="text-[13px] text-[#333]"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="join_country"
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
                  <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                    {/* Phone Number */}
                    <div className="form-group flex flex-col gap-1">
                      <PhoneInput
                        label="Phone Number"
                        name="join_phone"
                        value={formData.phone}
                        onChange={(value) => handleInputChange("phone", value)}
                        onValidationChange={setIsPhoneValid}
                        placeholder="Enter phone number"
                        required
                        defaultCountry="US"
                        error={!!errors.phone}
                        helperText={errors.phone}
                      />
                    </div>

                    {/* File Upload */}
                    <div className="file-input-wrapper form-group flex flex-col gap-1">
                      <label
                        htmlFor="join_cv"
                        className="text-[13px] text-[#333]"
                      >
                        Upload CV
                      </label>
                      <input
                        type="file"
                        id="join_cv"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="file-input absolute opacity-0 w-full cursor-pointer z-[2]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("join_cv")?.click()
                        }
                        className={cn(
                          "file-input-btn w-full h-11 px-4 cursor-pointer border border-[#e2e8f0] rounded-xl flex items-center gap-2 text-[13px] transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3 text-[#333]",
                          errors.cv && "border-red-500"
                        )}
                      >
                        <Upload className="w-4 h-4 text-[#333]" />
                        <span>{fileName}</span>
                      </button>
                      {errors.cv && (
                        <span className="text-red-500 text-xs">
                          {errors.cv}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Message */}
                  <div className="message-group form-group flex flex-col gap-1">
                    <label
                      htmlFor="join_message"
                      className="text-[13px] text-[#333]"
                    >
                      Message
                    </label>
                    <textarea
                      id="join_message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className={cn(
                        "w-full min-h-[120px] px-4 py-3 border border-[#e2e8f0] rounded-xl outline-none resize-none text-sm transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:min-h-[100px] max-md:px-3 max-md:py-2",
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
                      disabled={!recaptchaVerified || joinMutation.isPending || !isPhoneValid}
                      className="submit-btn min-w-[170px] w-fit h-12 rounded-[10px] px-[18px] text-sm font-semibold text-white bg-gradient-to-r from-[#314EA9] to-[#446AE1] border-none cursor-pointer flex items-center justify-center gap-2 ml-0 transition-all duration-500 ease-in-out hover:[&_svg]:translate-x-0.5 disabled:opacity-50 disabled:cursor-not-allowed max-md:w-full max-md:min-w-auto max-md:h-11 max-md:text-[13px]"
                    >
                      <span className="btn-text">
                        {joinMutation.isPending ? "Submitting..." : "Submit Application"}
                      </span>
                      <ChevronRight className="w-4 h-4" />
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
