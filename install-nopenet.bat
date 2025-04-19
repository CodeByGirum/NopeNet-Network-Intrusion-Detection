@echo off
echo *********************************************
echo *                                           *
echo *       NopeNet Installation Script         *
echo *                                           *
echo *********************************************
echo.

REM Check for admin rights
NET SESSION >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo This script requires administrator privileges.
    echo Please right-click on install-nopenet.bat and select "Run as administrator".
    pause
    exit /b 1
)

echo Checking prerequisites...

REM Check for Python
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH.
    echo Please install Python 3.8+ from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    pause
    exit /b 1
)

REM Check for Node.js
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed or not in PATH.
    echo Please install Node.js v16+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check for Docker (optional)
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed or not running.
    echo Docker is optional but recommended for the best experience.
    echo If you want to use Docker, please install it from https://www.docker.com/products/docker-desktop
    echo.
    echo Press any key to continue with the manual installation...
    pause >nul
    goto MANUAL_INSTALL
) else (
    echo Docker is installed.
    echo.
    echo Installation Options:
    echo 1. Docker Installation (Recommended)
    echo 2. Manual Installation
    echo.
    
    choice /C 12 /M "Select installation method (1 or 2)"
    
    if %ERRORLEVEL% EQU 1 goto DOCKER_INSTALL
    if %ERRORLEVEL% EQU 2 goto MANUAL_INSTALL
)

:DOCKER_INSTALL
echo.
echo Starting Docker installation...

REM Check if .env.local exists
if not exist .env.local (
    echo Creating .env.local file...
    echo OPENAI_API_KEY= > .env.local
    echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
    echo NODE_ENV=development >> .env.local
    
    echo Please enter your OpenAI API key:
    set /p OPENAI_KEY=
    
    if "%OPENAI_KEY%"=="" (
        echo No API key provided. The chat assistant will not work.
        echo You can add it later by editing the .env.local file.
    ) else (
        powershell -Command "(Get-Content .env.local) -replace 'OPENAI_API_KEY=', 'OPENAI_API_KEY=%OPENAI_KEY%' | Set-Content .env.local"
    )
)

echo Building and starting Docker containers...
docker-compose up -d

if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Docker containers.
    echo Please check the error message above.
    pause
    exit /b 1
)

echo Creating desktop shortcut...
call create-desktop-shortcut.bat

echo.
echo Docker installation complete!
echo NopeNet is now running at http://localhost:3000
echo.
echo To stop NopeNet, run: docker-compose down
echo.
pause
exit /b 0

:MANUAL_INSTALL
echo.
echo Starting manual installation...

REM Setup Python virtual environment
call setup_venv.bat

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install Node.js dependencies.
    echo Please check the error message above.
    pause
    exit /b 1
)

REM Check if .env.local exists
if not exist .env.local (
    echo Creating .env.local file...
    echo OPENAI_API_KEY= > .env.local
    echo NEXT_PUBLIC_APP_URL=http://localhost:3000 >> .env.local
    echo NODE_ENV=development >> .env.local
    
    echo Please enter your OpenAI API key:
    set /p OPENAI_KEY=
    
    if "%OPENAI_KEY%"=="" (
        echo No API key provided. The chat assistant will not work.
        echo You can add it later by editing the .env.local file.
    ) else (
        powershell -Command "(Get-Content .env.local) -replace 'OPENAI_API_KEY=', 'OPENAI_API_KEY=%OPENAI_KEY%' | Set-Content .env.local"
    )
)

echo Creating start menu shortcut...
set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\NopeNet.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%~dp0start-manual.bat" >> %SCRIPT%
echo oLink.WorkingDirectory = "%~dp0" >> %SCRIPT%
echo oLink.Description = "NopeNet Network Intrusion Detection System" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

echo.
echo Manual installation complete!
echo.
echo To start NopeNet:
echo 1. Double-click the desktop shortcut, or
echo 2. Run 'npm run dev' from this directory
echo.
echo Installation complete! Starting NopeNet...
start http://localhost:3000
start /MIN cmd /c "call nopenet_env\Scripts\activate.bat && npm run dev"

pause 