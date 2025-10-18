import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  isCopied: (text: string) => boolean;
  reset: () => void;
  showSuccessMessage: boolean;
}

export function useCopyToClipboard(resetDelay: number = 2000): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setShowSuccessMessage(true);
      
      // Reset after delay
      setTimeout(() => {
        setCopiedText(null);
        setShowSuccessMessage(false);
      }, resetDelay);
      
      return true;
    } catch (error) {
      console.error('Failed to copy text:', error);
      setCopiedText(null);
      setShowSuccessMessage(false);
      return false;
    }
  }, [resetDelay]);

  const isCopied = useCallback((text: string): boolean => {
    return copiedText === text;
  }, [copiedText]);

  const reset = useCallback(() => {
    setCopiedText(null);
    setShowSuccessMessage(false);
  }, []);

  return {
    copiedText,
    copy,
    isCopied,
    reset,
    showSuccessMessage
  };
}
