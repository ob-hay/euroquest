import apiClient from "@/lib/api-client";

// API Response Interface
export interface FormResponse {
  status: string;
  message: string;
  data?: any;
}

// Contact Form Service
export const submitContactForm = async (data: ContactFormData): Promise<FormResponse> => {
  try {
    const response = await apiClient.post<FormResponse>('/forms/contact', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit contact form');
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Register Form Service
export const submitRegisterForm = async (data: RegisterFormData): Promise<FormResponse> => {
  try {
    const response = await apiClient.post<FormResponse>('/forms/register', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit registration form');
  } catch (error) {
    console.error('Error submitting registration form:', error);
    throw error;
  }
};

// Inquire Form Service
export const submitInquireForm = async (data: InquireFormData): Promise<FormResponse> => {
  try {
    const response = await apiClient.post<FormResponse>('/forms/inquire', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit inquiry form');
  } catch (error) {
    console.error('Error submitting inquiry form:', error);
    throw error;
  }
};

// Download Form Service
export const submitDownloadForm = async (data: DownloadFormData): Promise<FormResponse> => {
  try {
    const response = await apiClient.post<FormResponse>('/forms/download', data);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit download form');
  } catch (error) {
    console.error('Error submitting download form:', error);
    throw error;
  }
};

// Join Form Service
export const submitJoinForm = async (data: JoinFormData): Promise<FormResponse> => {
  try {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('full_name', data.full_name);
    formData.append('phone_number', data.phone_number);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('category_id', data.category_id.toString());
    formData.append('cv', data.cv);
    
    if (data.speciality) {
      formData.append('speciality', data.speciality);
    }
    if (data.message) {
      formData.append('message', data.message);
    }
    if (data.recaptcha_token) {
      formData.append('recaptcha_token', data.recaptcha_token);
    }

    const response = await apiClient.post<FormResponse>('/forms/join', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to submit join form');
  } catch (error) {
    console.error('Error submitting join form:', error);
    throw error;
  }
};
