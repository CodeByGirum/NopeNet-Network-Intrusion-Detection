#!/bin/bash

echo "*********************************************"
echo "*                                           *"
echo "*       NopeNet Installation Script         *"
echo "*                                           *"
echo "*********************************************"
echo

# Make script executable
chmod +x install-nopenet.sh

# Check for prerequisites
echo "Checking prerequisites..."

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed or not in PATH."
    echo "Please install Python 3.8+ from your package manager."
    echo "For example: sudo apt install python3 python3-pip python3-venv"
    exit 1
fi

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed or not in PATH."
    echo "Please install Node.js v16+ from https://nodejs.org/ or using your package manager."
    exit 1
fi

# Check for Docker (optional)
if ! command -v docker &> /dev/null || ! command -v docker-compose &> /dev/null; then
    echo "Docker or Docker Compose is not installed or not running."
    echo "Docker is optional but recommended for the best experience."
    echo "If you want to use Docker, please install it from https://www.docker.com/products/docker-desktop"
    echo
    echo "Press Enter to continue with the manual installation..."
    read
    INSTALL_METHOD="manual"
else
    echo "Docker is installed."
    echo
    echo "Installation Options:"
    echo "1. Docker Installation (Recommended)"
    echo "2. Manual Installation"
    echo
    
    echo -n "Select installation method (1 or 2): "
    read choice
    
    if [ "$choice" = "1" ]; then
        INSTALL_METHOD="docker"
    else
        INSTALL_METHOD="manual"
    fi
fi

# Docker installation
if [ "$INSTALL_METHOD" = "docker" ]; then
    echo
    echo "Starting Docker installation..."
    
    # Check if .env.local exists
    if [ ! -f .env.local ]; then
        echo "Creating .env.local file..."
        echo "OPENAI_API_KEY=" > .env.local
        echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
        echo "NODE_ENV=development" >> .env.local
        
        echo "Please enter your OpenAI API key:"
        read OPENAI_KEY
        
        if [ -z "$OPENAI_KEY" ]; then
            echo "No API key provided. The chat assistant will not work."
            echo "You can add it later by editing the .env.local file."
        else
            sed -i "s/OPENAI_API_KEY=/OPENAI_API_KEY=$OPENAI_KEY/" .env.local
        fi
    fi
    
    # Make sure our scripts are executable
    chmod +x start-nopenet.sh
    
    echo "Building and starting Docker containers..."
    docker-compose up -d
    
    if [ $? -ne 0 ]; then
        echo "Failed to start Docker containers."
        echo "Please check the error message above."
        exit 1
    fi
    
    # Create desktop entry for Linux
    if [ "$(uname)" = "Linux" ] && [ -d "$HOME/.local/share/applications" ]; then
        echo "Creating desktop entry..."
        cp NopeNet.desktop $HOME/.local/share/applications/
        sed -i "s|cd $(dirname %k)|cd $(pwd)|" $HOME/.local/share/applications/NopeNet.desktop
        chmod +x $HOME/.local/share/applications/NopeNet.desktop
        echo "Desktop entry created at $HOME/.local/share/applications/NopeNet.desktop"
    fi
    
    echo
    echo "Docker installation complete!"
    echo "NopeNet is now running at http://localhost:3000"
    echo
    echo "To stop NopeNet, run: docker-compose down"
    echo
    
# Manual installation
else
    echo
    echo "Starting manual installation..."
    
    # Setup Python virtual environment
    chmod +x setup_venv.sh
    ./setup_venv.sh
    
    # Install Node.js dependencies
    echo "Installing Node.js dependencies..."
    npm install
    
    if [ $? -ne 0 ]; then
        echo "Failed to install Node.js dependencies."
        echo "Please check the error message above."
        exit 1
    fi
    
    # Check if .env.local exists
    if [ ! -f .env.local ]; then
        echo "Creating .env.local file..."
        echo "OPENAI_API_KEY=" > .env.local
        echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
        echo "NODE_ENV=development" >> .env.local
        
        echo "Please enter your OpenAI API key:"
        read OPENAI_KEY
        
        if [ -z "$OPENAI_KEY" ]; then
            echo "No API key provided. The chat assistant will not work."
            echo "You can add it later by editing the .env.local file."
        else
            sed -i "s/OPENAI_API_KEY=/OPENAI_API_KEY=$OPENAI_KEY/" .env.local
        fi
    fi
    
    # Create start script
    echo "Creating start script..."
    cat > start-manual.sh << 'EOL'
#!/bin/bash
echo "Starting NopeNet..."
cd "$(dirname "$0")"
source nopenet_env/bin/activate
xdg-open http://localhost:3000 &> /dev/null || open http://localhost:3000 &> /dev/null || echo "Open http://localhost:3000 in your browser"
npm run dev
echo "NopeNet has stopped."
EOL
    chmod +x start-manual.sh
    
    # Create desktop entry for Linux
    if [ "$(uname)" = "Linux" ] && [ -d "$HOME/.local/share/applications" ]; then
        echo "Creating desktop entry..."
        cat > $HOME/.local/share/applications/NopeNet.desktop << EOL
[Desktop Entry]
Name=NopeNet
Comment=Network Intrusion Detection System
Exec=bash -c "cd $(pwd) && ./start-manual.sh"
Terminal=true
Type=Application
Categories=Network;Security;
EOL
        chmod +x $HOME/.local/share/applications/NopeNet.desktop
        echo "Desktop entry created at $HOME/.local/share/applications/NopeNet.desktop"
    fi
    
    echo
    echo "Manual installation complete!"
    echo
    echo "To start NopeNet:"
    echo "1. Run './start-manual.sh' from this directory"
    echo "2. Or use the desktop shortcut (if created)"
    echo
    echo "Installation complete! Starting NopeNet..."
    ./start-manual.sh
fi 