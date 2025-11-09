// NOTE: To use this utility, you need to install pdfjs-dist:
// npm install pdfjs-dist
import * as pdfjsLib from 'pdfjs-dist';

// For local development with Vite, we need to construct the URL to the worker script
// which is copied to the 'dist' folder during the build process.
// A simpler approach for development is to use a CDN.
const PDF_WORKER_URL = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;


export async function parsePdf(file: File): Promise<string> {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      try {
        const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
          fullText += pageText + '\n\n';
        }
        
        resolve(fullText.trim());
      } catch (error) {
        console.error('Error parsing PDF:', error);
        reject(new Error("Could not parse the PDF file. It might be corrupted or in an unsupported format."));
      }
    };

    fileReader.onerror = (error) => {
      reject(new Error("Error reading file: " + error));
    };

    fileReader.readAsArrayBuffer(file);
  });
}
