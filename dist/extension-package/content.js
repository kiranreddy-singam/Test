// PDF to PPT Converter - Content Script

(function() {
    'use strict';

    // Flag to prevent multiple initializations
    if (window.pdfToPptConverterInitialized) {
        return;
    }
    window.pdfToPptConverterInitialized = true;

    // Configuration
    const CONFIG = {
        debug: false,
        supportedDomains: ['*'], // Support all domains
        pdfSelectors: [
            'a[href$=".pdf"]',
            'a[href*=".pdf"]',
            'embed[type="application/pdf"]',
            'object[type="application/pdf"]',
            'iframe[src$=".pdf"]',
            'iframe[src*=".pdf"]'
        ]
    };

    class PDFDetector {
        constructor() {
            this.detectedPDFs = new Set();
            this.observer = null;
            this.init();
        }

        init() {
            this.log('PDF to PPT Converter content script initialized');
            
            // Initial scan for PDFs
            this.scanForPDFs();
            
            // Set up mutation observer for dynamic content
            this.setupMutationObserver();
            
            // Listen for messages from popup/background
            this.setupMessageListener();
            
            // Add keyboard shortcut listener
            this.setupKeyboardShortcuts();
        }

        scanForPDFs() {
            const pdfElements = this.findPDFElements();
            
            pdfElements.forEach(element => {
                const pdfUrl = this.extractPDFUrl(element);
                if (pdfUrl && !this.detectedPDFs.has(pdfUrl)) {
                    this.detectedPDFs.add(pdfUrl);
                    this.addConvertButton(element, pdfUrl);
                    this.log(`PDF detected: ${pdfUrl}`);
                }
            });
        }

        findPDFElements() {
            const elements = [];
            
            CONFIG.pdfSelectors.forEach(selector => {
                const found = document.querySelectorAll(selector);
                elements.push(...Array.from(found));
            });
            
            return elements;
        }

        extractPDFUrl(element) {
            // Extract PDF URL from different element types
            if (element.href && element.href.includes('.pdf')) {
                return element.href;
            }
            if (element.src && element.src.includes('.pdf')) {
                return element.src;
            }
            if (element.data && element.data.includes('.pdf')) {
                return element.data;
            }
            return null;
        }

        addConvertButton(element, pdfUrl) {
            // Create convert button
            const button = document.createElement('button');
            button.innerHTML = '🔄 Convert to PPT';
            button.className = 'pdf-to-ppt-convert-btn';
            button.title = 'Convert this PDF to PowerPoint presentation';
            
            // Style the button
            this.styleConvertButton(button);
            
            // Add click handler
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleConvertClick(pdfUrl);
            });
            
            // Insert button near the PDF element
            this.insertConvertButton(element, button);
        }

        styleConvertButton(button) {
            Object.assign(button.style, {
                background: 'linear-gradient(135deg, #007bff, #6f42c1)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '8px',
                marginRight: '8px',
                marginTop: '4px',
                marginBottom: '4px',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: '9999',
                position: 'relative'
            });
            
            // Add hover effects
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-1px)';
                button.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            });
        }

        insertConvertButton(element, button) {
            try {
                // Try to insert after the element
                if (element.parentNode) {
                    element.parentNode.insertBefore(button, element.nextSibling);
                } else {
                    // Fallback: append to body
                    document.body.appendChild(button);
                }
            } catch (error) {
                this.log('Error inserting convert button:', error);
            }
        }

        async handleConvertClick(pdfUrl) {
            try {
                this.log(`Converting PDF: ${pdfUrl}`);
                
                // Show loading state
                this.showNotification('Downloading PDF for conversion...', 'info');
                
                // Download PDF file
                const pdfBlob = await this.downloadPDF(pdfUrl);
                
                // Create a File object
                const pdfFile = new File([pdfBlob], this.extractFileName(pdfUrl), {
                    type: 'application/pdf'
                });
                
                // Send message to background script or open popup with file
                this.openPopupWithFile(pdfFile);
                
            } catch (error) {
                this.log('Conversion error:', error);
                this.showNotification('Failed to convert PDF. Please try again.', 'error');
            }
        }

        async downloadPDF(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return await response.blob();
            } catch (error) {
                throw new Error(`Failed to download PDF: ${error.message}`);
            }
        }

        extractFileName(url) {
            try {
                const urlObj = new URL(url);
                const pathname = urlObj.pathname;
                const fileName = pathname.split('/').pop();
                return fileName.includes('.pdf') ? fileName : 'document.pdf';
            } catch {
                return 'document.pdf';
            }
        }

        openPopupWithFile(pdfFile) {
            // Store the file temporarily for the popup to access
            window.tempPDFFile = pdfFile;
            
            // Send message to background to trigger popup
            chrome.runtime.sendMessage({
                action: 'openPopupWithFile',
                fileName: pdfFile.name
            });
            
            this.showNotification('PDF ready for conversion. Click the extension icon to continue.', 'success');
        }

        setupMutationObserver() {
            this.observer = new MutationObserver((mutations) => {
                let shouldScan = false;
                
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        // Check if any added nodes contain PDF links
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                const pdfElements = this.findPDFElementsInNode(node);
                                if (pdfElements.length > 0) {
                                    shouldScan = true;
                                }
                            }
                        });
                    }
                });
                
                if (shouldScan) {
                    // Debounce the scan to avoid excessive calls
                    clearTimeout(this.scanTimeout);
                    this.scanTimeout = setTimeout(() => {
                        this.scanForPDFs();
                    }, 500);
                }
            });
            
            this.observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        findPDFElementsInNode(node) {
            const elements = [];
            
            CONFIG.pdfSelectors.forEach(selector => {
                try {
                    const found = node.querySelectorAll(selector);
                    elements.push(...Array.from(found));
                } catch (error) {
                    // Ignore selector errors for malformed HTML
                }
            });
            
            return elements;
        }

        setupMessageListener() {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                switch (request.action) {
                    case 'scanForPDFs':
                        this.scanForPDFs();
                        sendResponse({ success: true, count: this.detectedPDFs.size });
                        break;
                        
                    case 'getDetectedPDFs':
                        sendResponse({ pdfs: Array.from(this.detectedPDFs) });
                        break;
                        
                    case 'getTempFile':
                        if (window.tempPDFFile) {
                            sendResponse({ hasFile: true, fileName: window.tempPDFFile.name });
                        } else {
                            sendResponse({ hasFile: false });
                        }
                        break;
                        
                    default:
                        sendResponse({ error: 'Unknown action' });
                }
            });
        }

        setupKeyboardShortcuts() {
            document.addEventListener('keydown', (e) => {
                // Ctrl+Shift+P to scan for PDFs
                if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                    e.preventDefault();
                    this.scanForPDFs();
                    this.showNotification(`Found ${this.detectedPDFs.size} PDF(s) on this page`, 'info');
                }
            });
        }

        showNotification(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `pdf-to-ppt-notification ${type}`;
            notification.textContent = message;
            
            // Style notification
            Object.assign(notification.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                zIndex: '10000',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                maxWidth: '300px',
                wordWrap: 'break-word',
                animation: 'slideInRight 0.3s ease'
            });
            
            // Add animation CSS if not already added
            if (!document.getElementById('pdf-to-ppt-styles')) {
                const style = document.createElement('style');
                style.id = 'pdf-to-ppt-styles';
                style.textContent = `
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes slideOutRight {
                        from { transform: translateX(0); opacity: 1; }
                        to { transform: translateX(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }

        log(...args) {
            if (CONFIG.debug) {
                console.log('[PDF to PPT Converter]', ...args);
            }
        }

        destroy() {
            if (this.observer) {
                this.observer.disconnect();
            }
            
            // Remove all convert buttons
            const buttons = document.querySelectorAll('.pdf-to-ppt-convert-btn');
            buttons.forEach(button => {
                if (button.parentNode) {
                    button.parentNode.removeChild(button);
                }
            });
            
            this.log('PDF detector destroyed');
        }
    }

    // Initialize PDF detector
    const pdfDetector = new PDFDetector();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        pdfDetector.destroy();
    });

})();