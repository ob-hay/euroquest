"use client"
import { useEffect } from "react";

interface HeadingStylerProps {
  content: string;
}

export default function HeadingStyler({ content }: HeadingStylerProps) {
  useEffect(() => {
    // Function to style headings with specific classes
    const styleHeadings = () => {
      const overviewText = document.querySelector('.overview-text');
      if (!overviewText) return;

      const strongElements = overviewText.querySelectorAll('p strong:only-child');
      
      // Define main headings that should get primary styling
      const mainHeadings = [
        'Course Overview',
        'Course Benefits', 
        'Course Objectives',
        'Training Methodology',
        'Target Audience',
        'Target Competencies',
        'Course Outline',
        'Why Attend'
      ];
      
      strongElements.forEach(strong => {
        const text = strong.textContent?.trim() || '';
        
        // Remove existing classes to prevent duplicates
        strong.classList.remove('unit-heading', 'secondary-heading');
        
        // Check if it's a Unit heading
        if (text.startsWith('Unit ')) {
          strong.classList.add('unit-heading');
        }
        // Check if it's NOT one of the main headings, make it secondary
        else if (!mainHeadings.includes(text)) {
          strong.classList.add('secondary-heading');
        }
        // Main headings keep the default primary styling (no additional class needed)
      });
    };

    // Style headings when component mounts or content changes
    styleHeadings();
    
    // Set up MutationObserver to handle dynamic content changes
    const overviewText = document.querySelector('.overview-text');
    if (overviewText) {
      const observer = new MutationObserver(() => {
        // Debounce the styling to avoid excessive calls
        setTimeout(styleHeadings, 100);
      });
      
      observer.observe(overviewText, {
        childList: true,
        subtree: true,
        characterData: true
      });
      
      return () => observer.disconnect();
    }
    
    // Also call when DOM is ready (fallback for dynamic content)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', styleHeadings);
      return () => document.removeEventListener('DOMContentLoaded', styleHeadings);
    }
  }, [content]);

  return null; // This component doesn't render anything
}
