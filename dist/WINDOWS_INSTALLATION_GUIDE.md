# PDF to PPT Converter - Windows Installation Guide

## 🖥️ Windows Chrome Extension Installation

This guide provides multiple methods to install the PDF to PPT Converter Chrome extension on Windows systems.

## 📦 Package Contents

```
pdf-to-ppt-converter-windows/
├── windows-installer/
│   ├── install-extension.bat          # Automated installer script
│   ├── create-crx.bat                 # CRX package creator
│   └── uninstall-extension.bat        # Uninstaller script
├── extension-package/
│   ├── manifest.json                  # Extension configuration
│   ├── popup.html                     # Main interface
│   ├── popup.css                      # Styling
│   ├── popup.js                       # Core functionality
│   ├── background.js                  # Background service
│   ├── content.js                     # Web page integration
│   ├── icons/                         # Extension icons
│   └── README.md                      # Documentation
└── WINDOWS_INSTALLATION_GUIDE.md      # This file
```

## 🚀 Installation Methods

### Method 1: Automated Installation (Recommended)

**For most users - simplest approach:**

1. **Download the package**
   - Extract all files to a folder on your computer
   - Example: `C:\Extensions\PDF-to-PPT-Converter\`

2. **Run the installer**
   - Navigate to the `windows-installer` folder
   - **Right-click** on `install-extension.bat`
   - Select **"Run as administrator"** (recommended)
   - Or double-click to run normally

3. **Follow the installation wizard**
   - Choose option **[3] Install via Developer Mode**
   - The script will automatically:
     - Detect your Chrome installation
     - Open Chrome with the extension loaded
     - Provide further instructions if needed

4. **Complete installation**
   - Chrome should open with the extension loaded
   - Look for the PDF to PPT Converter icon in the toolbar
   - Pin the extension for easy access

### Method 2: Manual Installation

**For users who prefer manual control:**

1. **Open Chrome Extensions**
   - Type `chrome://extensions/` in your Chrome address bar
   - Or go to: Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Browse to the `extension-package` folder
   - Select the folder and click "Select Folder"

4. **Verify Installation**
   - The extension should appear in your extensions list
   - Pin it to your toolbar for easy access

### Method 3: CRX Package Installation

**For advanced users or enterprise deployment:**

1. **Create CRX Package**
   - Run `create-crx.bat` in the `windows-installer` folder
   - This creates a `pdf-to-ppt-converter.crx` file

2. **Install CRX File**
   - Drag the `.crx` file to Chrome's extensions page
   - Or use Chrome's command line: `chrome.exe --load-extension="path\to\extension"`

3. **Handle Security Warnings**
   - Chrome may show security warnings for unpacked extensions
   - Click "Add Extension" to confirm installation

## 🔧 System Requirements

### Minimum Requirements
- **Operating System**: Windows 7, 8, 8.1, 10, or 11
- **Chrome Browser**: Version 88 or later
- **RAM**: 2GB (4GB recommended for large PDF files)
- **Storage**: 50MB free space
- **Internet**: Required for initial library downloads

### Recommended Specifications
- **Operating System**: Windows 10/11
- **Chrome Browser**: Latest stable version
- **RAM**: 8GB or more
- **Storage**: 100MB+ free space
- **Internet**: Stable broadband connection

## 🛠️ Troubleshooting

### Common Installation Issues

#### ❌ "Chrome not found" Error
**Solution:**
- Ensure Chrome is installed in standard locations:
  - `C:\Program Files\Google\Chrome\Application\`
  - `C:\Program Files (x86)\Google\Chrome\Application\`
  - `%LocalAppData%\Google\Chrome\Application\`
- Reinstall Chrome if necessary

#### ❌ "Extension files not found" Error
**Solution:**
- Verify all files are extracted properly
- Ensure `manifest.json` exists in the `extension-package` folder
- Check file permissions (run as administrator if needed)

#### ❌ Extension doesn't appear in Chrome
**Solution:**
- Refresh the extensions page (`chrome://extensions/`)
- Ensure Developer mode is enabled
- Check for error messages on the extensions page
- Try reloading the extension

#### ❌ CRX creation fails
**Solution:**
- Modern Chrome versions restrict CRX installation
- Use Manual Installation (Method 2) instead
- Ensure all files are present and valid

### Performance Issues

#### 🐌 Slow conversion
**Solutions:**
- Close unnecessary browser tabs
- Try smaller PDF files first
- Check available RAM and storage
- Restart Chrome if needed

#### 💾 Out of memory errors
**Solutions:**
- Close other applications
- Use smaller PDF files (under 10MB)
- Restart your computer
- Upgrade RAM if consistently problematic

## 🔐 Security Considerations

### Windows Security
- **Windows Defender**: May flag batch scripts as potentially harmful
- **Solution**: Add the folder to Windows Defender exclusions
- **UAC Prompts**: Run installer as administrator to avoid repeated prompts

### Chrome Security
- **Developer Mode Warning**: Chrome shows warnings for unpacked extensions
- **Safe Practice**: Only install extensions from trusted sources
- **Privacy**: This extension processes files locally (no data transmission)

## 🗑️ Uninstallation

### Remove Extension
1. Go to `chrome://extensions/`
2. Find "PDF to PPT Converter"
3. Click "Remove" button
4. Confirm removal

### Clean Up Files
1. Delete the extension folder from your computer
2. Clear Chrome cache (optional):
   - Settings → Privacy and Security → Clear Browsing Data
   - Select "Cached images and files"

## 📞 Support & Troubleshooting

### Getting Help
1. **Check Documentation**: Read `README.md` and `test_extension.md`
2. **Enable Debug Mode**: Edit `content.js` and set `debug: true`
3. **Check Console**: Open Developer Tools (F12) → Console tab
4. **Test with Simple PDFs**: Start with small, text-based PDF files

### System Information for Support
When seeking help, provide:
- Windows version
- Chrome version
- Extension version (1.0.0)
- Error messages (if any)
- PDF file size and type

### Known Limitations
- **Large Files**: PDFs over 50MB may cause performance issues
- **Complex Layouts**: Advanced PDF layouts may not convert perfectly
- **Images**: Basic image support (placeholder implementation)
- **Fonts**: Some custom fonts may not be preserved

## 🔄 Updates

### Updating the Extension
1. Download the new version
2. Extract to the same folder (overwrite old files)
3. Go to `chrome://extensions/`
4. Click the refresh button on the extension card
5. Or remove and reinstall using the same steps

### Automatic Updates
- Extensions loaded via "Load unpacked" don't auto-update
- Check for new versions periodically
- Consider submitting to Chrome Web Store for automatic updates

## 📋 Quick Reference

### Essential Commands
```batch
# Install extension
install-extension.bat

# Create CRX package
create-crx.bat

# Open Chrome extensions page
start chrome "chrome://extensions/"
```

### Important File Locations
- **Extension Files**: `extension-package/`
- **Installer Scripts**: `windows-installer/`
- **Generated CRX**: `windows-installer/pdf-to-ppt-converter.crx`
- **Chrome Extensions**: `chrome://extensions/`

---

**Version**: 1.0.0  
**Platform**: Windows  
**Last Updated**: December 2024  
**Compatibility**: Windows 7+ with Chrome 88+