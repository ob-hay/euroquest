import { usePopupStore } from "@/store/popup-store";
import { AlertData } from "@/store/popup-store";

export const useAlert = () => {
  const { showAlert } = usePopupStore();

  const showSuccessAlert = (
    title: string, 
    message?: string, 
    options?: Partial<AlertData>
  ) => {
    showAlert({
      type: "success",
      title,
      message,
      showCloseButton: true,
      autoClose: true,
      duration: 5000,
      ...options,
    });
  };

  const showErrorAlert = (
    title: string, 
    message?: string, 
    options?: Partial<AlertData>
  ) => {
    showAlert({
      type: "error",
      title,
      message,
      showCloseButton: true,
      autoClose: false,
      ...options,
    });
  };

  const showWarningAlert = (
    title: string, 
    message?: string, 
    options?: Partial<AlertData>
  ) => {
    showAlert({
      type: "warning",
      title,
      message,
      showCloseButton: true,
      autoClose: true,
      duration: 6000,
      ...options,
    });
  };

  const showInfoAlert = (
    title: string, 
    message?: string, 
    options?: Partial<AlertData>
  ) => {
    showAlert({
      type: "info",
      title,
      message,
      showCloseButton: true,
      autoClose: true,
      duration: 5000,
      ...options,
    });
  };

  return {
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showInfoAlert,
  };
};
