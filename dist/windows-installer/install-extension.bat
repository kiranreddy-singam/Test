@echo off
REM PDF to PPT Converter Chrome Extension - Windows Installer
REM Version 1.0.0

echo ====================================================
echo  PDF to PPT Converter - Chrome Extension Installer
echo ====================================================
echo.

REM Check if Chrome is installed
set CHROME_PATH=""
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%LocalAppData%\Google\Chrome\Application\chrome.exe"
) else (
    echo ERROR: Google Chrome not found!
    echo Please install Google Chrome first.
    echo Download from: https://www.google.com/chrome/
    pause
    exit /b 1
)

echo Chrome found at: %CHROME_PATH%
echo.

REM Get the current directory
set EXTENSION_DIR=%~dp0..\extension-package

REM Check if extension files exist
if not exist "%EXTENSION_DIR%\manifest.json" (
    echo ERROR: Extension files not found!
    echo Please ensure the extension-package folder is present.
    pause
    exit /b 1
)

echo Extension files found in: %EXTENSION_DIR%
echo.

echo INSTALLATION OPTIONS:
echo.
echo [1] Open Chrome Extensions page (Manual installation)
echo [2] Open extension folder (For manual loading)
echo [3] Install via Developer Mode (Recommended)
echo [4] Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto open_extensions
if "%choice%"=="2" goto open_folder
if "%choice%"=="3" goto developer_install
if "%choice%"=="4" goto exit
goto invalid_choice

:open_extensions
echo Opening Chrome Extensions page...
start %CHROME_PATH% "chrome://extensions/"
echo.
echo MANUAL INSTALLATION STEPS:
echo 1. Enable "Developer mode" (toggle in top-right)
echo 2. Click "Load unpacked"
echo 3. Select the extension-package folder
echo 4. The extension should appear in your extensions list
echo.
goto end

:open_folder
echo Opening extension folder...
explorer "%EXTENSION_DIR%"
echo.
echo The extension folder has been opened.
echo You can now manually load it in Chrome:
echo 1. Go to chrome://extensions/
echo 2. Enable Developer mode
echo 3. Click "Load unpacked"
echo 4. Select the opened folder
echo.
goto end

:developer_install
echo Attempting automated installation...
echo.
echo Opening Chrome with extension loading...
start %CHROME_PATH% --load-extension="%EXTENSION_DIR%" --no-first-run

REM Wait a moment for Chrome to start
timeout /t 3 > nul

echo Chrome has been started with the extension loaded.
echo.
echo If the extension didn't load automatically:
echo 1. Go to chrome://extensions/
echo 2. Enable "Developer mode"
echo 3. Look for "PDF to PPT Converter" in the list
echo.
echo If you see any errors, please use manual installation (Option 1).
echo.
goto end

:invalid_choice
echo Invalid choice. Please enter 1, 2, 3, or 4.
echo.
goto main_menu

:exit
echo Installation cancelled.
goto end

:end
echo.
echo ====================================================
echo Installation process completed!
echo.
echo NEXT STEPS:
echo 1. Pin the extension to your Chrome toolbar
echo 2. Try converting a PDF file to test functionality
echo 3. Visit websites with PDF links to see auto-detection
echo.
echo For support, see README.md or test_extension.md
echo ====================================================
echo.
pause