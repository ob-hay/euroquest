import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFGenerationOptions {
  filename?: string;
  quality?: number;
  scale?: number;
  backgroundColor?: string;
}

export class PDFGenerator {
  /**
   * Generate PDF from HTML element
   * @param elementId - ID of the HTML element to convert
   * @param options - PDF generation options
   */
  static async generateFromElement(
    elementId: string, 
    options: PDFGenerationOptions = {}
  ): Promise<void> {
    const {
      filename = 'course-brochure.pdf',
      quality = 0.98,
      scale = 2,
      backgroundColor = '#ffffff'
    } = options;

    try {
      // Get the HTML element
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`);
      }

      // Temporarily show the element if it's hidden
      const originalDisplay = element.style.display;
      const originalVisibility = element.style.visibility;
      const originalPosition = element.style.position;
      const originalLeft = element.style.left;
      const originalTop = element.style.top;
      
      element.style.display = 'block';
      element.style.visibility = 'visible';
      element.style.position = 'static';
      element.style.left = 'auto';
      element.style.top = 'auto';

      // Wait for any images or fonts to load
      await this.waitForImages(element);
      await this.waitForFonts();
      
      // Additional wait for Google Fonts to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert HTML to canvas
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        allowTaint: true,
        backgroundColor: backgroundColor,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Restore original styles
      element.style.display = originalDisplay;
      element.style.visibility = originalVisibility;
      element.style.position = originalPosition;
      element.style.left = originalLeft;
      element.style.top = originalTop;

      // Calculate PDF dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      // Add first page
      pdf.addImage(
        canvas.toDataURL('image/jpeg', quality),
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg', quality),
          'JPEG',
          0,
          position,
          imgWidth,
          imgHeight
        );
        heightLeft -= pageHeight;
      }

      // Download the PDF
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate PDF from React component by rendering it temporarily
   * @param component - React component to render
   * @param options - PDF generation options
   */
  static async generateFromComponent(
    component: React.ReactElement,
    options: PDFGenerationOptions = {}
  ): Promise<void> {
    const {
      filename = 'course-brochure.pdf',
      quality = 0.98,
      scale = 2,
      backgroundColor = '#ffffff'
    } = options;

    try {
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.id = 'temp-pdf-container';
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '210mm';
      tempContainer.style.minHeight = '297mm';
      tempContainer.style.backgroundColor = backgroundColor;
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      
      document.body.appendChild(tempContainer);

      // Render the component
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(tempContainer);
      root.render(component);

      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate PDF
      await this.generateFromElement('temp-pdf-container', {
        filename,
        quality,
        scale,
        backgroundColor
      });

      // Cleanup
      root.unmount();
      document.body.removeChild(tempContainer);

    } catch (error) {
      console.error('Error generating PDF from component:', error);
      throw new Error(`Failed to generate PDF from component: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Wait for all images in the element to load
   */
  private static async waitForImages(element: HTMLElement): Promise<void> {
    const images = element.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error(`Failed to load image: ${img.src}`));
        // Timeout after 5 seconds
        setTimeout(() => reject(new Error('Image load timeout')), 5000);
      });
    });

    try {
      await Promise.all(imagePromises);
    } catch (error) {
      console.warn('Some images failed to load:', error);
    }
  }

  /**
   * Wait for fonts to load
   */
  private static async waitForFonts(): Promise<void> {
    if ('fonts' in document) {
      try {
        await document.fonts.ready;
      } catch (error) {
        console.warn('Font loading failed:', error);
      }
    }
  }

  /**
   * Generate a simple text-based PDF (fallback method)
   */
  static generateSimplePDF(
    content: string,
    filename: string = 'course-brochure.pdf'
  ): void {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    // Split content into lines
    const lines = pdf.splitTextToSize(content, maxWidth);
    
    let y = margin;
    const lineHeight = 7;
    
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += lineHeight;
    });
    
    pdf.save(filename);
  }

  /**
   * Generate PDF with fallback methods
   */
  static async generateWithFallback(
    elementId: string,
    fallbackContent: string,
    options: PDFGenerationOptions = {}
  ): Promise<void> {
    try {
      // Try the main method first
      await this.generateFromElement(elementId, options);
    } catch (error) {
      console.warn('Main PDF generation failed, trying fallback method:', error);
      try {
        // Try fallback method
        this.generateSimplePDF(fallbackContent, options.filename);
      } catch (fallbackError) {
        console.error('Fallback PDF generation also failed:', fallbackError);
        throw new Error('Both PDF generation methods failed');
      }
    }
  }
}
