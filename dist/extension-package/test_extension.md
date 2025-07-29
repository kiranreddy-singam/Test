# Testing Guide for PDF to PPT Converter Extension

## 🧪 Testing Checklist

### Pre-Installation Testing

1. **File Structure Verification**
   - ✅ `manifest.json` exists and is valid JSON
   - ✅ `popup.html` contains proper HTML structure
   - ✅ `popup.css` has modern styling
   - ✅ `popup.js` contains conversion logic
   - ✅ `background.js` has service worker code
   - ✅ `content.js` has PDF detection logic
   - ✅ `README.md` has complete documentation

### Installation Testing

2. **Chrome Extension Loading**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the extension folder
   - Verify no error messages appear
   - Check that extension appears in the list

3. **Extension Icon and Popup**
   - Look for extension icon in Chrome toolbar
   - Click the extension icon
   - Verify popup window opens (400px width)
   - Check that all UI elements are visible and styled correctly

### Functionality Testing

4. **PDF File Upload**
   - Click "Choose PDF File" button
   - Select a valid PDF file (small test file recommended)
   - Verify file name appears below upload area
   - Check that "Convert to PPT" button becomes enabled

5. **Conversion Options**
   - Toggle "Include Images" checkbox
   - Toggle "Preserve Formatting" checkbox
   - Change "Slides per Page" dropdown selection
   - Verify all controls work properly

6. **PDF to PPT Conversion**
   - Upload a simple PDF (1-3 pages)
   - Click "Convert to PPT" button
   - Watch for loading spinner and progress messages
   - Wait for conversion to complete (may take 10-30 seconds)
   - Verify "Download PPT" button appears

7. **File Download**
   - Click "Download PPT" button
   - Check that PPTX file downloads to default download folder
   - Open downloaded file in PowerPoint/Google Slides
   - Verify content was extracted and formatted properly

### Web Page Integration Testing

8. **PDF Detection on Web Pages**
   - Navigate to a website with PDF links (like academic papers, documentation)
   - Look for "🔄 Convert to PPT" buttons next to PDF links
   - Try clicking a convert button
   - Verify PDF downloads and extension popup prompts

9. **Keyboard Shortcuts**
   - Press `Ctrl+Shift+P` on a page with PDFs
   - Check for notification about detected PDFs

### Error Handling Testing

10. **Invalid File Types**
    - Try uploading non-PDF files (.txt, .doc, .jpg)
    - Verify appropriate error messages appear

11. **Large PDF Files**
    - Test with larger PDF files (5-10MB)
    - Monitor for performance issues or memory errors

12. **Network Issues**
    - Disable internet connection
    - Try conversion (should work after libraries are cached)
    - Re-enable connection and test again

### Performance Testing

13. **Library Loading**
    - Check browser console for any library loading errors
    - Monitor network tab for CDN requests (PDF.js, PptxGenJS)

14. **Memory Usage**
    - Open Chrome Task Manager (`Shift+Esc`)
    - Monitor extension memory usage during conversion
    - Check for memory leaks after multiple conversions

### Browser Console Testing

15. **Debug Mode**
    - Open Developer Tools (`F12`)
    - Check Console tab for any JavaScript errors
    - Look for extension-specific log messages

### Cross-Browser Testing (Optional)

16. **Chromium-based Browsers**
    - Test in Microsoft Edge
    - Test in Brave Browser
    - Verify similar functionality

## 🐛 Common Issues to Watch For

### Installation Issues
- **Manifest errors**: Invalid JSON syntax
- **File path errors**: Missing files referenced in manifest
- **Permission warnings**: Excessive or unusual permissions

### Runtime Issues
- **Library loading failures**: CDN unavailable or blocked
- **Popup not opening**: JavaScript errors preventing initialization
- **File upload not working**: File API compatibility issues

### Conversion Issues
- **PDF parsing errors**: Corrupted or password-protected PDFs
- **Empty slides**: PDFs with no extractable text
- **Download failures**: Browser download restrictions

### Performance Issues
- **Slow conversion**: Large files or complex PDFs
- **Memory consumption**: Browser running out of memory
- **UI freezing**: Blocking operations not properly handled

## 📊 Test Results Template

```
EXTENSION TEST RESULTS
Date: ___________
Chrome Version: ___________
Extension Version: 1.0.0

✅ PASSED / ❌ FAILED / ⚠️ ISSUES

[  ] Installation successful
[  ] Popup UI displays correctly
[  ] PDF file upload works
[  ] Conversion options functional
[  ] PDF to PPT conversion works
[  ] File download successful
[  ] Generated PPT opens correctly
[  ] Web page PDF detection works
[  ] Convert buttons appear and function
[  ] Error handling appropriate
[  ] Performance acceptable
[  ] No console errors

NOTES:
_________________________________
_________________________________
_________________________________
```

## 🔧 Debugging Tips

1. **Enable Debug Mode**
   - Edit `content.js`
   - Change `debug: false` to `debug: true`
   - Reload extension
   - Check console for detailed logs

2. **Check Extension Errors**
   - Go to `chrome://extensions/`
   - Look for "Errors" button on extension card
   - Review any reported errors

3. **Network Issues**
   - Check Network tab in DevTools
   - Verify CDN resources load successfully
   - Look for CORS or security policy issues

4. **File Inspection**
   - Save intermediate files during debugging
   - Check PDF content extraction results
   - Verify PPT generation parameters

This testing guide ensures the extension works correctly across different scenarios and helps identify potential issues before deployment.