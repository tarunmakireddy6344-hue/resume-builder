import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadResumeAsPDF(elementId = 'resume-preview', filename = 'resume.pdf') {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error('Resume preview element not found');
    return;
  }

  // Create a clone for clean capture (avoids scroll issues)
  const element = originalElement.cloneNode(true);
  
  // Style the clone to be fully visible and outside the viewport
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  element.style.top = '0';
  element.style.width = '794px'; // Exact A4 width in px at 96 DPI
  element.style.height = 'auto';
  element.style.overflow = 'visible';
  element.style.transform = 'none'; // Remove any zoom/scale
  
  // Hide visual page guides in the PDF
  const guides = element.querySelectorAll('.preview-a4::after');
  guides.forEach(g => g.remove());
  
  element.style.backgroundImage = 'none';
  element.style.backgroundColor = '#ffffff';
  element.style.minHeight = 'auto'; // Prevent extra blank space for short content

  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: element.scrollHeight,
      windowWidth: 794,
      windowHeight: element.scrollHeight
    });

    // Cleanup the clone
    document.body.removeChild(element);

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate ratio based on width to fill the A4 page
    const ratio = pdfWidth / imgWidth;
    const imgX = 0;

    // Handle multi-page content
    const pageHeightInPdfUnits = pdfHeight;
    const pageHeightInCanvasUnits = pdfHeight / ratio;
    
    let heightLeft = imgHeight;
    let position = 0;
    let pageNum = 0;

    // Slicing the canvas into multiple A4 pages
    // Using a threshold of 5px highly reduces chances of a blank extra page
    const thresholdInCanvasUnits = 5 / ratio; 

    while (heightLeft > thresholdInCanvasUnits) {
      if (pageNum > 0) pdf.addPage();
      
      pdf.setPage(pageNum + 1);
      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        -(position * ratio),
        imgWidth * ratio,
        imgHeight * ratio,
        undefined,
        'FAST'
      );
      
      heightLeft -= pageHeightInCanvasUnits;
      position += pageHeightInCanvasUnits;
      pageNum++;
    }

    pdf.save(filename);
  } catch (err) {
    console.error('PDF generation failed:', err);
    if (document.body.contains(element)) document.body.removeChild(element);
    alert('PDF generation failed. Please try again.');
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  // Handle YYYY-MM or YYYY
  const parts = dateStr.split('-');
  if (parts.length === 1) return parts[0]; // Just Year
  
  const d = new Date(dateStr + '-01');
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
