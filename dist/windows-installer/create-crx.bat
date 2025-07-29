@echo off
REM Create CRX package for PDF to PPT Converter Extension
REM This script packages the extension into a .crx file

echo ====================================================
echo  PDF to PPT Converter - CRX Package Creator
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
    echo Cannot create CRX package without Chrome.
    pause
    exit /b 1
)

echo Chrome found at: %CHROME_PATH%

REM Set paths
set EXTENSION_DIR=%~dp0..\extension-package
set OUTPUT_DIR=%~dp0
set CRX_FILE=%OUTPUT_DIR%pdf-to-ppt-converter.crx
set PEM_FILE=%OUTPUT_DIR%pdf-to-ppt-converter.pem

REM Check if extension exists
if not exist "%EXTENSION_DIR%\manifest.json" (
    echo ERROR: Extension directory not found!
    echo Expected location: %EXTENSION_DIR%
    pause
    exit /b 1
)

echo Extension directory: %EXTENSION_DIR%
echo Output CRX file: %CRX_FILE%
echo.

echo Creating CRX package...
echo.

REM Create the CRX package
%CHROME_PATH% --pack-extension="%EXTENSION_DIR%" --pack-extension-key="%PEM_FILE%" 2>nul

REM Check if successful (Chrome creates the .crx in the parent directory)
set CREATED_CRX=%EXTENSION_DIR%.crx
if exist "%CREATED_CRX%" (
    echo SUCCESS: CRX package created!
    
    REM Move to desired location with better name
    move "%CREATED_CRX%" "%CRX_FILE%" >nul
    
    echo CRX file location: %CRX_FILE%
    
    REM Check if PEM key was created
    set CREATED_PEM=%EXTENSION_DIR%.pem
    if exist "%CREATED_PEM%" (
        move "%CREATED_PEM%" "%PEM_FILE%" >nul
        echo PEM key file: %PEM_FILE%
        echo.
        echo IMPORTANT: Keep the .pem file safe for future updates!
    )
    
    echo.
    echo CRX package is ready for distribution!
    echo Users can install it by:
    echo 1. Dragging the .crx file to Chrome
    echo 2. Or using the install-extension.bat script
    
) else (
    echo ERROR: Failed to create CRX package.
    echo.
    echo This might be due to:
    echo 1. Chrome security restrictions
    echo 2. Invalid manifest.json
    echo 3. Missing extension files
    echo.
    echo Try using the manual installation method instead.
    echo Run: install-extension.bat
)

echo.
echo ====================================================
pause