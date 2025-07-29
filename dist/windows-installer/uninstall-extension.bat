@echo off
REM PDF to PPT Converter Chrome Extension - Uninstaller
REM Version 1.0.0

echo ====================================================
echo  PDF to PPT Converter - Extension Uninstaller
echo ====================================================
echo.

echo This script will help you remove the PDF to PPT Converter extension.
echo.

set /p confirm="Are you sure you want to uninstall? (Y/N): "
if /i not "%confirm%"=="Y" (
    echo Uninstallation cancelled.
    pause
    exit /b 0
)

REM Check if Chrome is running
tasklist /FI "IMAGENAME eq chrome.exe" 2>nul | find /I "chrome.exe" >nul
if "%ERRORLEVEL%"=="0" (
    echo.
    echo WARNING: Chrome is currently running.
    echo Please close Chrome before uninstalling the extension.
    echo.
    set /p closechrome="Close Chrome now? (Y/N): "
    if /i "%closechrome%"=="Y" (
        taskkill /F /IM chrome.exe 2>nul
        echo Chrome has been closed.
        timeout /t 3 > nul
    ) else (
        echo Please close Chrome manually and run this script again.
        pause
        exit /b 1
    )
)

echo.
echo UNINSTALLATION OPTIONS:
echo.
echo [1] Open Chrome Extensions page (Manual removal)
echo [2] Remove extension files from computer
echo [3] Complete removal (Extensions page + files)
echo [4] Cancel
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto open_extensions
if "%choice%"=="2" goto remove_files
if "%choice%"=="3" goto complete_removal
if "%choice%"=="4" goto cancel
goto invalid_choice

:open_extensions
echo Opening Chrome Extensions page for manual removal...
echo.

REM Find Chrome installation
set CHROME_PATH=""
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%ProgramFiles%\Google\Chrome\Application\chrome.exe"
) else if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set CHROME_PATH="%LocalAppData%\Google\Chrome\Application\chrome.exe"
) else (
    echo Chrome not found. Please open chrome://extensions/ manually.
    goto manual_instructions
)

start %CHROME_PATH% "chrome://extensions/"

:manual_instructions
echo.
echo MANUAL REMOVAL STEPS:
echo 1. Find "PDF to PPT Converter" in the extensions list
echo 2. Click the "Remove" button
echo 3. Confirm the removal when prompted
echo 4. The extension will be uninstalled from Chrome
echo.
goto end

:remove_files
echo Removing extension files from computer...
echo.

set EXTENSION_DIR=%~dp0..\extension-package
set INSTALLER_DIR=%~dp0

echo Removing files from: %EXTENSION_DIR%
if exist "%EXTENSION_DIR%" (
    rmdir /s /q "%EXTENSION_DIR%" 2>nul
    if exist "%EXTENSION_DIR%" (
        echo WARNING: Some files could not be removed.
        echo Please delete manually: %EXTENSION_DIR%
    ) else (
        echo Extension files removed successfully.
    )
) else (
    echo Extension files not found or already removed.
)

echo.
echo Removing installer files...
set /p remove_installer="Remove installer files too? (Y/N): "
if /i "%remove_installer%"=="Y" (
    echo This will delete the installer scripts.
    echo You won't be able to reinstall without downloading again.
    set /p final_confirm="Are you sure? (Y/N): "
    if /i "%final_confirm%"=="Y" (
        echo Removing installer directory...
        cd /d "%~dp0..\.."
        rmdir /s /q "windows-installer" 2>nul
        echo Installer files removed.
    )
)
goto end

:complete_removal
echo Performing complete removal...
echo.

REM Open extensions page first
call :open_extensions

echo.
echo Waiting for you to remove the extension from Chrome...
echo Please remove "PDF to PPT Converter" from the extensions page.
echo.
pause

REM Then remove files
call :remove_files
goto end

:invalid_choice
echo Invalid choice. Please enter 1, 2, 3, or 4.
echo.
goto main_menu

:cancel
echo Uninstallation cancelled.
goto end

:end
echo.
echo ====================================================
echo Uninstallation process completed!
echo.
echo If you want to reinstall the extension later:
echo 1. Download the extension package again
echo 2. Run install-extension.bat
echo.
echo Thank you for using PDF to PPT Converter!
echo ====================================================
echo.
pause