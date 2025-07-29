// PDF to PPT Converter - Background Service Worker

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('PDF to PPT Converter installed');
        
        // Set default settings
        chrome.storage.local.set({
            conversionCount: 0,
            settings: {
                includeImages: true,
                preserveFormatting: true,
                slidesPerPage: 'auto'
            }
        });
    } else if (details.reason === 'update') {
        console.log('PDF to PPT Converter updated');
    }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'convertPDF':
            handlePDFConversion(request.data, sendResponse);
            return true; // Keep message channel open for async response
            
        case 'getSettings':
            getExtensionSettings(sendResponse);
            return true;
            
        case 'saveSettings':
            saveExtensionSettings(request.settings, sendResponse);
            return true;
            
        case 'getConversionCount':
            getConversionCount(sendResponse);
            return true;
            
        default:
            console.log('Unknown action:', request.action);
            sendResponse({ error: 'Unknown action' });
    }
});

async function handlePDFConversion(data, sendResponse) {
    try {
        // Increment conversion count
        const result = await chrome.storage.local.get(['conversionCount']);
        const newCount = (result.conversionCount || 0) + 1;
        await chrome.storage.local.set({ conversionCount: newCount });
        
        // Log conversion attempt
        console.log(`PDF conversion attempt #${newCount}`);
        
        // For now, just acknowledge the conversion request
        // The actual conversion happens in the popup
        sendResponse({ 
            success: true, 
            conversionNumber: newCount,
            message: 'Conversion request processed'
        });
        
    } catch (error) {
        console.error('Background conversion error:', error);
        sendResponse({ 
            success: false, 
            error: error.message 
        });
    }
}

async function getExtensionSettings(sendResponse) {
    try {
        const result = await chrome.storage.local.get(['settings']);
        const defaultSettings = {
            includeImages: true,
            preserveFormatting: true,
            slidesPerPage: 'auto'
        };
        
        sendResponse({ 
            settings: result.settings || defaultSettings 
        });
    } catch (error) {
        console.error('Error getting settings:', error);
        sendResponse({ error: error.message });
    }
}

async function saveExtensionSettings(settings, sendResponse) {
    try {
        await chrome.storage.local.set({ settings });
        console.log('Settings saved:', settings);
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error saving settings:', error);
        sendResponse({ error: error.message });
    }
}

async function getConversionCount(sendResponse) {
    try {
        const result = await chrome.storage.local.get(['conversionCount']);
        sendResponse({ 
            count: result.conversionCount || 0 
        });
    } catch (error) {
        console.error('Error getting conversion count:', error);
        sendResponse({ error: error.message });
    }
}

// Handle extension icon click (optional - for future features)
chrome.action.onClicked.addListener((tab) => {
    // This would only fire if no popup is defined
    console.log('Extension icon clicked on tab:', tab.url);
});

// Context menu integration (optional - for future features)
chrome.runtime.onStartup.addListener(() => {
    console.log('PDF to PPT Converter service worker started');
});

// Handle storage changes
chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log('Storage changed:', changes, namespace);
    
    if (changes.settings) {
        console.log('Settings updated:', changes.settings.newValue);
    }
    
    if (changes.conversionCount) {
        console.log('Conversion count updated:', changes.conversionCount.newValue);
    }
});

// Cleanup on extension unload
self.addEventListener('beforeunload', () => {
    console.log('PDF to PPT Converter service worker unloading');
});