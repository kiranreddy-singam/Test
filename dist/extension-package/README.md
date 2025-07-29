# PDF to PPT Converter - Chrome Extension

A powerful Chrome browser extension that converts PDF files to PowerPoint presentations with ease. Transform your PDF documents into editable PowerPoint slides with just a few clicks.

## 🚀 Features

- **Easy PDF Upload**: Drag and drop or browse for PDF files
- **Smart Content Extraction**: Automatically extracts text and structure from PDFs
- **Customizable Conversion**: Options for image inclusion, formatting preservation, and slide organization
- **One-Click Download**: Generate and download PPTX files instantly
- **Web Page Integration**: Automatically detects PDF links on web pages and adds convert buttons
- **Modern UI**: Beautiful, responsive interface with smooth animations
- **Offline Capable**: Works without internet connection once libraries are loaded

## 📦 Installation

### Method 1: Load Unpacked Extension (Recommended for Development)

1. **Download the Extension Files**
   - Clone or download this repository
   - Extract all files to a folder on your computer

2. **Enable Developer Mode in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle "Developer mode" in the top right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Select the folder containing the extension files
   - The extension should appear in your extensions list

4. **Pin the Extension**
   - Click the extensions icon (puzzle piece) in Chrome toolbar
   - Pin the "PDF to PPT Converter" extension for easy access

### Method 2: Manual Installation

1. Create a new folder for the extension
2. Copy all the following files into the folder:
   - `manifest.json`
   - `popup.html`
   - `popup.css`
   - `popup.js`
   - `background.js`
   - `content.js`
3. Follow steps 2-4 from Method 1

## 🎯 Usage

### Converting PDF Files

1. **Click the Extension Icon**
   - Click the PDF to PPT Converter icon in your Chrome toolbar
   - The popup interface will open

2. **Upload Your PDF**
   - Click "Choose PDF File" to browse for a file
   - Or drag and drop a PDF file onto the upload area
   - Only PDF files are accepted

3. **Configure Conversion Options**
   - **Include Images**: Toggle to include/exclude images from PDF
   - **Preserve Formatting**: Maintain original text formatting
   - **Slides per Page**: Choose how many slides per PDF page:
     - 1 slide per page (default)
     - 2 slides per page (splits content)
     - Auto detect (smart detection)

4. **Convert and Download**
   - Click "Convert to PPT" to start the conversion
   - Wait for the process to complete (usually 10-30 seconds)
   - Click "Download PPT" to save the generated PowerPoint file

### Web Page Integration

The extension automatically scans web pages for PDF links and adds convert buttons:

1. **Automatic Detection**
   - Browse any website with PDF links
   - Convert buttons appear next to PDF links automatically

2. **Quick Convert**
   - Click the "🔄 Convert to PPT" button next to any PDF link
   - The PDF will be downloaded and prepared for conversion
   - Click the extension icon to complete the conversion

3. **Keyboard Shortcut**
   - Press `Ctrl+Shift+P` to manually scan for PDFs on the current page

## ⚙️ Technical Details

### Libraries Used

- **PDF.js**: For PDF parsing and text extraction
- **PptxGenJS**: For PowerPoint file generation
- **Chrome Extensions API**: For browser integration

### File Structure

```
pdf-to-ppt-converter/
├── manifest.json         # Extension configuration
├── popup.html           # Main popup interface
├── popup.css            # Styling for popup
├── popup.js             # Popup functionality
├── background.js        # Background service worker
├── content.js           # Content script for web page integration
└── README.md            # This documentation
```

### Supported PDF Features

- ✅ Text extraction and preservation
- ✅ Basic formatting recognition
- ✅ Multi-page documents
- ✅ Different page layouts
- ⚠️ Images (basic support, placeholder implementation)
- ❌ Complex graphics and vector art
- ❌ Forms and interactive elements

### Generated PPT Features

- Clean slide layouts with titles
- Bullet-point formatting for content
- Customizable slide organization
- Standard PowerPoint compatibility
- Proper file compression

## 🔧 Configuration

### Extension Settings

Settings are automatically saved and include:

- **Include Images**: Default enabled
- **Preserve Formatting**: Default enabled  
- **Slides per Page**: Default auto-detect
- **Conversion Count**: Tracks usage statistics

### Performance Optimization

- Libraries are loaded dynamically to reduce initial load time
- Content is processed in chunks to prevent UI blocking
- Conversion progress is shown with loading indicators
- Error handling with user-friendly messages

## 🐛 Troubleshooting

### Common Issues

**Extension doesn't load:**
- Ensure all files are in the same folder
- Check that Developer mode is enabled
- Refresh the extensions page

**PDF upload fails:**
- Verify the file is a valid PDF
- Check file size (large files may take longer)
- Ensure the PDF isn't password protected

**Conversion fails:**
- Check browser console for error messages
- Try with a simpler PDF file first
- Ensure stable internet connection for library loading

**Download doesn't work:**
- Check browser's download settings
- Ensure popup blockers aren't interfering
- Try right-clicking the download button

### Debug Mode

To enable debug logging:
1. Open `content.js`
2. Change `debug: false` to `debug: true` in the CONFIG object
3. Reload the extension
4. Check browser console for detailed logs

## 🔒 Privacy & Security

- **No Data Collection**: The extension doesn't collect or transmit personal data
- **Local Processing**: All PDF processing happens locally in your browser
- **No Server Communication**: Files are not uploaded to external servers
- **Temporary Storage**: Files are only temporarily stored in browser memory
- **Auto Cleanup**: Temporary data is cleared when conversion completes

## 🚧 Limitations

- **File Size**: Very large PDFs (>50MB) may cause performance issues
- **Complex Layouts**: Advanced PDF layouts may not convert perfectly
- **Image Quality**: Image extraction is basic and may need improvement
- **Font Support**: Some custom fonts may not be preserved
- **Browser Memory**: Large conversions may consume significant memory

## 🛠️ Development

### Prerequisites

- Chrome browser (version 88+)
- Basic knowledge of JavaScript and Chrome Extensions API

### Building from Source

1. Clone the repository
2. Make your changes to the source files
3. Test in Chrome with Developer mode
4. Create a new version by updating `manifest.json`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues, questions, or feature requests:
- Check the troubleshooting section above
- Review existing issues in the repository
- Create a new issue with detailed information

## 🔮 Future Enhancements

- **Advanced Image Extraction**: Better image handling and preservation
- **Layout Detection**: Smarter slide layout based on PDF structure  
- **Batch Conversion**: Convert multiple PDFs at once
- **Cloud Integration**: Optional cloud storage integration
- **Template Support**: Predefined PowerPoint templates
- **OCR Support**: Extract text from image-based PDFs
- **Export Options**: Additional output formats (Google Slides, etc.)

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Compatibility**: Chrome 88+, Chromium-based browsers