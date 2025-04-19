# NopeNet Docker Installation Guide

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation Steps

1. **Clone the repository**:
   ```
   git clone https://github.com/CodeByGirum/NopeNet-Network-Intrusion-Detection
   cd NopeNet-Network-Intrusion-Detection
   ```

2. **Set up your OpenAI API key**:
   
   Create a `.env.local` file in the root directory with:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```
   Replace `your-api-key-here` with your actual OpenAI API key.

3. **Start NopeNet with Docker**:

   ### Windows:
   - Double-click the `start-nopenet.bat` file.
   - Or open Command Prompt and run:
     ```
     docker-compose up -d
     ```

   ### macOS/Linux:
   - Make the startup script executable:
     ```
     chmod +x start-nopenet.sh
     ```
   - Run the script:
     ```
     ./start-nopenet.sh
     ```
   - Or use Docker Compose directly:
     ```
     docker-compose up -d
     ```

4. **Access NopeNet**:
   
   Open your browser and go to [http://localhost:3000](http://localhost:3000)

## Desktop Shortcut Setup

### Windows:
1. Right-click on `start-nopenet.bat`
2. Select "Create shortcut"
3. Move the shortcut to your desktop

### Linux:
1. Copy the `NopeNet.desktop` file to `~/.local/share/applications/` or `/usr/share/applications/`
   ```
   cp NopeNet.desktop ~/.local/share/applications/
   ```
2. Make it executable:
   ```
   chmod +x ~/.local/share/applications/NopeNet.desktop
   ```

### macOS:
1. Open Script Editor
2. Create a new script with:
   ```
   do shell script "cd /path/to/nopenet && ./start-nopenet.sh"
   ```
3. Save as Application
4. Drag to Applications folder or desktop

## Stopping NopeNet

Run the following command from the project directory:
```
docker-compose down
```

## Troubleshooting

If you encounter any issues:

1. Check Docker is running properly:
   ```
   docker --version
   docker-compose --version
   ```

2. View logs:
   ```
   docker-compose logs
   ```

3. Make sure ports 3000 and 8000 are not already in use by other applications.

### Python Dependency Issues

If you encounter dependency errors related to Python packages:

1. **Docker Installation**:
   - The Docker setup should handle all dependencies automatically
   - If you see Python-related errors in the Docker logs, try rebuilding the image:
     ```
     docker-compose down
     docker-compose build --no-cache
     docker-compose up -d
     ```

2. **Manual Installation**:
   - Use the provided setup scripts to create an isolated environment:
     - Windows: `setup_venv.bat`
     - Linux/macOS: `./setup_venv.sh`
   - These scripts create a virtual environment with the exact versions needed

3. **Common requirements.txt Issues**:
   - The exact versions in requirements.txt have been tested to work together
   - Do not modify version numbers unless you know what you're doing
   - If you need different versions, use Docker which provides an isolated environment
   
4. **Version Conflicts**:
   - If you see errors about conflicting dependencies:
     ```
     pip install --upgrade pip
     pip install -r server/requirements.txt --force-reinstall
     ```
     This forces reinstallation of all dependencies 