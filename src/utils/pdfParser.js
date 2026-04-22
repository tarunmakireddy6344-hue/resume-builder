import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure the worker to use Vite's native worker loading
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;


/**
 * Extracts raw text from a PDF file using pdfjs-dist.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    
    // Group items by their Y coordinate (transform[5])
    const items = content.items.sort((a, b) => b.transform[5] - a.transform[5]);
    
    let lastY = -1;
    let pageText = '';
    
    for (const item of items) {
      const currentY = item.transform[5];
      
      if (lastY !== -1) {
        const diff = Math.abs(lastY - currentY);
        if (diff > 15) {
          pageText += '\n\n'; // Significant vertical gap (likely new entry)
        } else if (diff > 5) {
          pageText += '\n'; // Small vertical gap (new line)
        } else {
          pageText += ' '; // Inline
        }
      }
      
      pageText += item.str;
      lastY = currentY;
    }
    
    fullText += pageText + '\n\n';
  }

  return fullText;
}
