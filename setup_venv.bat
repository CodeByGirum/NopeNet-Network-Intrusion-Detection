@echo off
echo Setting up Python virtual environment for NopeNet...

REM Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not in PATH. Please install Python 3.8+ and try again.
    exit /b 1
)

REM Create virtual environment
echo Creating virtual environment...
python -m venv nopenet_env

REM Activate virtual environment
echo Activating virtual environment...
call nopenet_env\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install requirements
echo Installing Python dependencies...
python -m pip install -r server\requirements.txt

echo Python virtual environment setup complete!
echo To activate the environment in the future, run: nopenet_env\Scripts\activate.bat
echo.
echo Now you can install Node.js dependencies by running: npm install
echo.
pause 