import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { 
  submitContactForm, 
  submitRegisterForm, 
  submitInquireForm, 
  submitDownloadForm, 
  submitJoinForm,
  FormResponse
} from './forms-services';

// Contact Form Hook
export const useContactForm = (): UseMutationResult<FormResponse, Error, ContactFormData> => {
  return useMutation({
    mutationFn: submitContactForm,
    onSuccess: (data) => {
      console.log('Contact form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Contact form submission failed:', error);
    },
  });
};

// Register Form Hook
export const useRegisterForm = (): UseMutationResult<FormResponse, Error, RegisterFormData> => {
  return useMutation({
    mutationFn: submitRegisterForm,
    onSuccess: (data) => {
      console.log('Registration form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Registration form submission failed:', error);
    },
  });
};

// Inquire Form Hook
export const useInquireForm = (): UseMutationResult<FormResponse, Error, InquireFormData> => {
  return useMutation({
    mutationFn: submitInquireForm,
    onSuccess: (data) => {
      console.log('Inquiry form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Inquiry form submission failed:', error);
    },
  });
};

// Download Form Hook
export const useDownloadForm = (): UseMutationResult<FormResponse, Error, DownloadFormData> => {
  return useMutation({
    mutationFn: submitDownloadForm,
    onSuccess: (data) => {
      console.log('Download form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Download form submission failed:', error);
    },
  });
};

// Join Form Hook
export const useJoinForm = (): UseMutationResult<FormResponse, Error, JoinFormData> => {
  return useMutation({
    mutationFn: submitJoinForm,
    onSuccess: (data) => {
      console.log('Join form submitted successfully:', data);
    },
    onError: (error) => {
      console.error('Join form submission failed:', error);
    },
  });
};
