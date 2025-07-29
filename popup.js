// PDF to PPT Converter - Popup Script
class PDFToPPTConverter {
    constructor() {
        this.selectedFile = null;
        this.convertedPPTBlob = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const pdfFileInput = document.getElementById('pdfFile');
        const convertBtn = document.getElementById('convertBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        pdfFileInput.addEventListener('change', this.handleFileSelection.bind(this));
        convertBtn.addEventListener('click', this.handleConversion.bind(this));
        downloadBtn.addEventListener('click', this.handleDownload.bind(this));
    }

    handleFileSelection(event) {
        const file = event.target.files[0];
        const fileNameDiv = document.getElementById('fileName');
        const convertBtn = document.getElementById('convertBtn');

        if (file && file.type === 'application/pdf') {
            this.selectedFile = file;
            fileNameDiv.textContent = `Selected: ${file.name}`;
            convertBtn.disabled = false;
            this.updateStatus('File selected successfully', 'success');
        } else {
            this.selectedFile = null;
            fileNameDiv.textContent = '';
            convertBtn.disabled = true;
            this.updateStatus('Please select a valid PDF file', 'error');
        }
    }

    async handleConversion() {
        if (!this.selectedFile) {
            this.updateStatus('Please select a PDF file first', 'error');
            return;
        }

        const convertBtn = document.getElementById('convertBtn');
        const btnText = convertBtn.querySelector('.btn-text');
        const spinner = convertBtn.querySelector('.loading-spinner');

        // Show loading state
        convertBtn.disabled = true;
        btnText.style.display = 'none';
        spinner.style.display = 'inline-block';
        this.updateStatus('Converting PDF to PPT...', 'processing');

        try {
            // Get conversion options
            const options = {
                includeImages: document.getElementById('includeImages').checked,
                preserveFormatting: document.getElementById('preserveFormatting').checked,
                slidesPerPage: document.getElementById('slidesPerPage').value
            };

            // Process PDF and convert to PPT
            const pptBlob = await this.convertPDFToPPT(this.selectedFile, options);
            
            if (pptBlob) {
                this.convertedPPTBlob = pptBlob;
                this.updateStatus('Conversion completed successfully!', 'success');
                this.showDownloadSection();
            } else {
                throw new Error('Conversion failed');
            }

        } catch (error) {
            console.error('Conversion error:', error);
            this.updateStatus('Conversion failed. Please try again.', 'error');
        } finally {
            // Reset button state
            convertBtn.disabled = false;
            btnText.style.display = 'inline-block';
            spinner.style.display = 'none';
        }
    }

    async convertPDFToPPT(pdfFile, options) {
        try {
            // Load PDF.js library dynamically
            await this.loadPDFJS();
            
            // Convert PDF file to array buffer
            const arrayBuffer = await pdfFile.arrayBuffer();
            
            // Parse PDF with PDF.js
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            
            // Extract content from PDF pages
            const pdfContent = await this.extractPDFContent(pdf, options);
            
            // Generate PPT from extracted content
            const pptBlob = await this.generatePPT(pdfContent, options);
            
            return pptBlob;
            
        } catch (error) {
            console.error('PDF to PPT conversion error:', error);
            throw error;
        }
    }

    async loadPDFJS() {
        return new Promise((resolve, reject) => {
            if (window.pdfjsLib) {
                resolve();
                return;
            }

            // Load PDF.js from CDN
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => {
                // Set worker
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    async extractPDFContent(pdf, options) {
        const content = {
            pages: [],
            title: 'Converted Presentation',
            metadata: {}
        };

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            try {
                const page = await pdf.getPage(pageNum);
                const pageContent = await this.extractPageContent(page, options);
                content.pages.push(pageContent);
            } catch (error) {
                console.error(`Error processing page ${pageNum}:`, error);
                // Continue with other pages
            }
        }

        return content;
    }

    async extractPageContent(page, options) {
        const pageContent = {
            text: '',
            images: [],
            shapes: [],
            pageNumber: page.pageNumber
        };

        try {
            // Extract text content
            const textContent = await page.getTextContent();
            const textItems = textContent.items.map(item => item.str).join(' ');
            pageContent.text = this.cleanText(textItems);

            // Extract images if option is enabled
            if (options.includeImages) {
                pageContent.images = await this.extractPageImages(page);
            }

            // Get page dimensions for layout
            const viewport = page.getViewport({ scale: 1.0 });
            pageContent.dimensions = {
                width: viewport.width,
                height: viewport.height
            };

        } catch (error) {
            console.error('Error extracting page content:', error);
        }

        return pageContent;
    }

    async extractPageImages(page) {
        const images = [];
        
        try {
            // This is a simplified approach - in a full implementation,
            // you'd need to process the page's operator list to extract images
            const operatorList = await page.getOperatorList();
            
            // For now, return empty array as image extraction from PDF.js
            // requires more complex implementation
            return images;
            
        } catch (error) {
            console.error('Error extracting images:', error);
            return images;
        }
    }

    cleanText(text) {
        return text
            .replace(/\s+/g, ' ')
            .replace(/[^\w\s.,!?;:()-]/g, '')
            .trim();
    }

    async generatePPT(pdfContent, options) {
        try {
            // Load PptxGenJS library dynamically
            await this.loadPptxGenJS();
            
            // Create new presentation
            const pptx = new PptxGenJS();
            
            // Set presentation properties
            pptx.author = 'PDF to PPT Converter';
            pptx.company = 'Chrome Extension';
            pptx.title = pdfContent.title;
            
            // Process pages based on slides per page option
            const slides = this.organizeContentIntoSlides(pdfContent, options);
            
            // Create slides
            for (const slideContent of slides) {
                const slide = pptx.addSlide();
                await this.populateSlide(slide, slideContent, options);
            }
            
            // Generate PPT blob
            const pptBlob = await pptx.writeFile({
                fileName: 'converted-presentation.pptx',
                compression: 'DEFLATE'
            });
            
            return pptBlob;
            
        } catch (error) {
            console.error('PPT generation error:', error);
            throw error;
        }
    }

    async loadPptxGenJS() {
        return new Promise((resolve, reject) => {
            if (window.PptxGenJS) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pptxgenjs/3.12.0/pptxgen.bundle.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    organizeContentIntoSlides(pdfContent, options) {
        const slides = [];
        const slidesPerPage = options.slidesPerPage;

        if (slidesPerPage === 'auto' || slidesPerPage === '1') {
            // One slide per PDF page
            for (const page of pdfContent.pages) {
                slides.push({
                    title: `Slide ${page.pageNumber}`,
                    content: page.text,
                    images: page.images,
                    pageNumber: page.pageNumber
                });
            }
        } else if (slidesPerPage === '2') {
            // Two slides per PDF page - split content
            for (const page of pdfContent.pages) {
                const textParts = this.splitTextIntoTwo(page.text);
                slides.push({
                    title: `Slide ${page.pageNumber}A`,
                    content: textParts[0],
                    images: page.images.slice(0, Math.ceil(page.images.length / 2)),
                    pageNumber: page.pageNumber
                });
                slides.push({
                    title: `Slide ${page.pageNumber}B`,
                    content: textParts[1],
                    images: page.images.slice(Math.ceil(page.images.length / 2)),
                    pageNumber: page.pageNumber
                });
            }
        }

        return slides;
    }

    splitTextIntoTwo(text) {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        const midPoint = Math.ceil(sentences.length / 2);
        
        return [
            sentences.slice(0, midPoint).join('. ').trim() + '.',
            sentences.slice(midPoint).join('. ').trim() + '.'
        ];
    }

    async populateSlide(slide, slideContent, options) {
        try {
            // Add title
            slide.addText(slideContent.title, {
                x: 0.5,
                y: 0.5,
                w: 9,
                h: 1,
                fontSize: 24,
                bold: true,
                color: '2F4F4F'
            });

            // Add content text
            if (slideContent.content && slideContent.content.trim()) {
                const contentLines = this.formatContentForSlide(slideContent.content);
                
                slide.addText(contentLines, {
                    x: 0.5,
                    y: 1.8,
                    w: 9,
                    h: 5,
                    fontSize: 14,
                    color: '333333',
                    align: 'left',
                    valign: 'top'
                });
            }

            // Add images if available and option is enabled
            if (options.includeImages && slideContent.images.length > 0) {
                // For now, add placeholder for images
                slide.addText('📷 Images from PDF page', {
                    x: 0.5,
                    y: 7,
                    w: 9,
                    h: 0.5,
                    fontSize: 12,
                    color: '666666',
                    italic: true
                });
            }

        } catch (error) {
            console.error('Error populating slide:', error);
        }
    }

    formatContentForSlide(content) {
        // Split content into bullet points or paragraphs
        const maxLength = 800; // Maximum characters per slide
        
        if (content.length <= maxLength) {
            return content;
        }
        
        // Split into sentences and create bullet points
        const sentences = content.split(/[.!?]+/).filter(s => s.trim());
        const bulletPoints = [];
        let currentLength = 0;
        
        for (const sentence of sentences) {
            if (currentLength + sentence.length > maxLength) {
                break;
            }
            bulletPoints.push('• ' + sentence.trim());
            currentLength += sentence.length;
        }
        
        return bulletPoints.join('\n\n');
    }

    handleDownload() {
        if (!this.convertedPPTBlob) {
            this.updateStatus('No converted file available for download', 'error');
            return;
        }

        try {
            // Create download link
            const url = URL.createObjectURL(this.convertedPPTBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `converted-${this.selectedFile.name.replace('.pdf', '')}.pptx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.updateStatus('Download started successfully!', 'success');
        } catch (error) {
            console.error('Download error:', error);
            this.updateStatus('Download failed. Please try again.', 'error');
        }
    }

    showDownloadSection() {
        const downloadSection = document.getElementById('downloadSection');
        downloadSection.style.display = 'block';
    }

    updateStatus(message, type) {
        const statusDiv = document.getElementById('status');
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        
        // Clear status after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'status';
            }, 5000);
        }
    }
}

// Initialize the converter when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFToPPTConverter();
});

// Handle any errors globally
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});