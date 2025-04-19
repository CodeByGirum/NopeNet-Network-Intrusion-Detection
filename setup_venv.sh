#!/bin/bash
echo "Setting up Python virtual environment for NopeNet..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed or not in PATH. Please install Python 3.8+ and try again."
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv nopenet_env

# Activate virtual environment
echo "Activating virtual environment..."
source nopenet_env/bin/activate

# Upgrade pip
echo "Upgrading pip..."
python -m pip install --upgrade pip

# Install requirements
echo "Installing Python dependencies..."
python -m pip install -r server/requirements.txt

echo "Python virtual environment setup complete!"
echo "To activate the environment in the future, run: source nopenet_env/bin/activate"
echo
echo "Now you can install Node.js dependencies by running: npm install"
echo

# Make script executable on creation
chmod +x setup_venv.sh 