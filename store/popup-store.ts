import { create } from 'zustand'

export interface PopupData {
  course?: Course
  timing?: Timing
  courseTitle?: string
  timingId?: string
}

export interface ToastData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export interface AlertData {
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  showCloseButton?: boolean;
  autoClose?: boolean;
  duration?: number;
}

interface PopupState {
  // Contact popup
  isContactOpen: boolean
  contactData: PopupData
  
  // Download popup
  isDownloadOpen: boolean
  downloadData: PopupData
  
  // Inquire popup
  isInquireOpen: boolean
  inquireData: PopupData
  
  // Join popup
  isJoinOpen: boolean
  joinData: PopupData
  
  // Register popup
  isRegisterOpen: boolean
  registerData: PopupData
  
  // Toast notifications
  toasts: ToastData[]
  
  // Alert popup
  alertData: AlertData | null
  
  // Actions
  openContact: (data?: PopupData) => void
  closeContact: () => void
  
  openDownload: (data?: PopupData) => void
  closeDownload: () => void
  
  openInquire: (data?: PopupData) => void
  closeInquire: () => void
  
  openJoin: (data?: PopupData) => void
  closeJoin: () => void
  
  openRegister: (data?: PopupData) => void
  closeRegister: () => void
  
  // Close all popups
  closeAll: () => void
  
  // Toast actions
  showToast: (toast: Omit<ToastData, 'id'>) => void
  hideToast: (id: string) => void
  clearAllToasts: () => void
  
  // Alert actions
  showAlert: (alert: AlertData) => void
  closeAlert: () => void
}

export const usePopupStore = create<PopupState>((set) => ({
  // Initial state
  isContactOpen: false,
  contactData: {},
  
  isDownloadOpen: false,
  downloadData: {},
  
  isInquireOpen: false,
  inquireData: {},
  
  isJoinOpen: false,
  joinData: {},
  
  isRegisterOpen: false,
  registerData: {},
  
  // Toast initial state
  toasts: [],
  
  // Alert initial state
  alertData: null,
  
  // Contact actions
  openContact: (data = {}) => set({ 
    isContactOpen: true, 
    contactData: data,
    // Close other popups
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeContact: () => set({ isContactOpen: false, contactData: {} }),
  
  // Download actions
  openDownload: (data = {}) => set({ 
    isDownloadOpen: true, 
    downloadData: data,
    // Close other popups
    isContactOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeDownload: () => set({ isDownloadOpen: false, downloadData: {} }),
  
  // Inquire actions
  openInquire: (data = {}) => set({ 
    isInquireOpen: true, 
    inquireData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false
  }),
  closeInquire: () => set({ isInquireOpen: false, inquireData: {} }),
  
  // Join actions
  openJoin: (data = {}) => set({ 
    isJoinOpen: true, 
    joinData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isRegisterOpen: false
  }),
  closeJoin: () => set({ isJoinOpen: false, joinData: {} }),
  
  // Register actions
  openRegister: (data = {}) => set({ 
    isRegisterOpen: true, 
    registerData: data,
    // Close other popups
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false
  }),
  closeRegister: () => set({ isRegisterOpen: false, registerData: {} }),
  
  // Close all popups
  closeAll: () => set({
    isContactOpen: false,
    isDownloadOpen: false,
    isInquireOpen: false,
    isJoinOpen: false,
    isRegisterOpen: false,
    contactData: {},
    downloadData: {},
    inquireData: {},
    joinData: {},
    registerData: {},
    alertData: null
  }),
  
  // Toast actions
  showToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastData = { ...toast, id };
    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));
  },
  
  hideToast: (id) => set((state) => ({
    toasts: state.toasts.filter(toast => toast.id !== id)
  })),
  
  clearAllToasts: () => set({ toasts: [] }),
  
  // Alert actions
  showAlert: (alert) => set({ alertData: alert }),
  closeAlert: () => set({ alertData: null })
}))
