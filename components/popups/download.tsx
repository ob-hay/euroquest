"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PhoneInput from "@/components/ui/phone-input";
import { useDownloadForm } from "@/services/forms/forms-hooks";
import ReCaptchaV2 from "@/components/ui/recaptcha-v2";
import {
  RECAPTCHA_CONFIG,
  validateRecaptchaConfig,
} from "@/constants/recaptcha";
import ProgressBar from "@/components/ui/progress-bar";
import SuccessMessage from "@/components/shared/success-message";
import { usePopupStore } from "@/store/popup-store";
import { useAlert } from "@/hooks/useAlert";

interface DownloadFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  timingId?: string;
}

export default function DownloadPopup() {
  const { isDownloadOpen, downloadData, closeDownload } = usePopupStore();
  const { showSuccessAlert, showErrorAlert } = useAlert();

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const { course, timing, courseTitle = "", timingId = "" } = downloadData;
  const [formData, setFormData] = useState<DownloadFormData>({
    fullName: "",
    phoneNumber: "",
    email: "",
    company: "",
    timingId: timingId,
  });
  const [errors, setErrors] = useState<Partial<DownloadFormData>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState("");

  // Use the download form mutation
  const downloadMutation = useDownloadForm();

  // Check if reCAPTCHA is configured
  const isRecaptchaConfigured = validateRecaptchaConfig();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isDownloadOpen) {
        closeDownload();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isDownloadOpen, closeDownload]);

  // Reset progress state when popup closes
  useEffect(() => {
    if (!isDownloadOpen) {
      setIsGeneratingPDF(false);
      setProgress(0);
      setShowSuccessMessage(false);
      setDownloadedFileName("");
    }
  }, [isDownloadOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isDownloadOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDownloadOpen]);

  const handleInputChange = (field: keyof DownloadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    handleInputChange("phoneNumber", value);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DownloadFormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isPhoneValid) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) newErrors.company = "Company is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    setRecaptchaVerified(true);
  };

  const handleRecaptchaError = (error: any) => {
    console.error("reCAPTCHA error:", error);
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
    showErrorAlert(
      "Error!",
      "reCAPTCHA verification failed. Please try again."
    );
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaVerified(false);
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check reCAPTCHA only if it's configured
    if (isRecaptchaConfigured && !recaptchaVerified) {
      showErrorAlert("Error!", "Please complete the reCAPTCHA verification");
      return;
    }

    // Prepare data for API
    const apiData = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phoneNumber,
      company_name: formData.company,
      timing_id: parseInt(formData.timingId || "0") || 0,
      ...(isRecaptchaConfigured &&
        recaptchaToken && { recaptcha_token: recaptchaToken }),
    };

    try {
      await downloadMutation.mutateAsync(apiData);

      // Start PDF generation process
      if (course && timing) {
        setIsGeneratingPDF(true);
        setProgress(0);

        try {
          const filename = `${course.title.replace(
            /[^a-zA-Z0-9]/g,
            "_"
          )}_${timing.city.title.replace(/[^a-zA-Z0-9]/g, "_")}_brochure.pdf`;
          setDownloadedFileName(filename);

          // Simulate progress updates
          const progressInterval = setInterval(() => {
            setProgress((prev) => {
              if (prev >= 90) {
                clearInterval(progressInterval);
                return 90;
              }
              return prev + Math.random() * 15;
            });
          }, 200);

          // Generate PDF using server-side API
          const response = await fetch("/api/pdf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              course,
              timing: {
                ...timing,
                city: timing.city || { title: "Dubai", name: "Dubai" },
              },
              filename,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to generate PDF");
          }

          // Download the PDF
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);

          // Complete progress
          clearInterval(progressInterval);
          setProgress(100);

          // Wait a moment then show success message
          setTimeout(() => {
            setIsGeneratingPDF(false);
            closeDownload(); // Close the popup first

            // Show success message after popup closes
            setTimeout(() => {
              setShowSuccessMessage(true);
            }, 300);
          }, 500);
        } catch (pdfError) {
          console.error("Error generating PDF:", pdfError);
          setIsGeneratingPDF(false);
          setProgress(0);
          showErrorAlert(
            "Error!",
            "PDF generation failed, but your request was submitted successfully."
          );
        }
      } else {
        // If no course/timing data, just show success
        showSuccessAlert(
          "Success!",
          "Thank you! Your brochure download will start shortly."
        );
        setTimeout(() => {
          closeDownload();
        }, 1000);
      }

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        company: "",
        timingId: timingId,
      });
      setRecaptchaVerified(false);
      setRecaptchaToken(null);
    } catch (error) {
      setIsGeneratingPDF(false);
      setProgress(0);
      showErrorAlert(
        "Error!",
        "There was an error processing your download request. Please try again."
      );
    }
  };

  if (!isDownloadOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDownload();
    }
  };

  return (
    <>
      {/* Success Message */}
      <SuccessMessage
        isVisible={showSuccessMessage}
        onClose={() => setShowSuccessMessage(false)}
        message="Brochure downloaded successfully!"
        fileName={downloadedFileName}
      />

      <div
        className="fixed top-0 left-0 z-[100] inset-0 bg-black/70 flex items-center justify-center p-4 overflow-y-auto md:p-4 max-md:pt-8 max-md:p-2"
        onClick={handleOverlayClick}
      >
        {/* Modal Content */}
        <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] w-full max-w-[1152px] rounded-lg md:rounded-[18px] md:p-2.5 overflow-hidden relative mx-auto max-md:rounded-lg">
          {/* Close Button */}
          <button
            onClick={closeDownload}
            className="absolute top-1 right-2.5 bg-none border-none text-sm text-[#6F6F6F] cursor-pointer z-10 p-2.5 rounded-full transition-all duration-300 hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col h-full max-h-full">
            {/* Right Section - Download Form */}
            <div className="flex-1 p-4 md:p-6 overflow-y-auto rounded-lg max-md:p-3">
              {/* Header */}
              <div className="register-header mb-8 max-md:mb-6">
                <h3 className="text-[#3E5EC0] text-xl font-bold mb-2 max-md:text-lg">
                  {courseTitle || "Download Brochure"}
                </h3>
              </div>

              {/* Progress Bar - Inside Modal */}
              {isGeneratingPDF && (
                <div className="mb-6">
                  <ProgressBar
                    progress={progress}
                    isVisible={isGeneratingPDF}
                    message="Preparing brochure for download..."
                  />
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="form-inputs flex flex-col gap-4"
              >
                {/* Form Grid */}
                <div className="form-grid grid gap-2 md:grid-cols-2 max-md:grid-cols-1 max-md:gap-3">
                  {/* Full Name */}
                  <div className="form-group flex flex-col gap-1">
                    <label
                      htmlFor="download_full_name"
                      className="text-[13px] text-[#333]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="download_full_name"
                      name="name"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className={cn(
                        "h-11 w-full px-4 border border-[#e2e8f0] rounded-xl outline-none transition-all duration-300 hover:border-[#314EA9] focus:outline-none focus:border-[#667eea] focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1),0_4px_12px_rgba(102,126,234,0.15)] focus:-translate-y-0.5 max-md:h-10 max-md:px-3",
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

                  {/* Phone Number */}
                  <PhoneInput
                    id="phone2"
                    name="phone"
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

                  {/* Email */}
                  <div className="form-group flex flex-col gap-1">
                    <label
                      htmlFor="download_email"
                      className="text-[13px] text-[#333]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="download_email"
                      name="email"
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

                  {/* Company */}
                  <div className="form-group flex flex-col gap-1">
                    <label
                      htmlFor="download_company"
                      className="text-[13px] text-[#333]"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="download_company"
                      name="company_name"
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

                {/* Hidden timing ID */}
                <input type="hidden" name="timing_id" value={timingId} />

                {/* Submit Section */}
                <div className="form-submition flex items-center justify-between gap-8 max-md:flex-col-reverse max-md:gap-4">
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={
                      !recaptchaVerified ||
                      downloadMutation.isPending ||
                      isGeneratingPDF ||
                      !isPhoneValid
                    }
                    className="submit-btn min-w-[170px] w-fit h-12 rounded-[10px] px-[18px] text-sm font-semibold text-white bg-gradient-to-r from-[#314EA9] to-[#446AE1] border-none cursor-pointer flex items-center justify-center gap-2 ml-0 transition-all duration-500 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed max-md:w-full max-md:min-w-auto max-md:h-11 max-md:text-[13px]"
                  >
                    <span className="btn-text">
                      {downloadMutation.isPending
                        ? "Processing..."
                        : isGeneratingPDF
                        ? "Generating PDF..."
                        : "Download Brochure"}
                    </span>
                    {!downloadMutation.isPending && !isGeneratingPDF && (
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
    </>
  );
}
