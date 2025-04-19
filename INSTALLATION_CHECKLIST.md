# NopeNet Installation Checklist

Use this checklist to verify that your NopeNet installation is working correctly.

## Prerequisites Check

- [ ] Docker and Docker Compose installed (for Docker installation method)
  - Run `docker --version` and `docker-compose --version` to verify
- [ ] Node.js v16+ installed (for manual installation method)
  - Run `node --version` to verify
- [ ] Python 3.8+ installed (for manual installation method)
  - Run `python --version` to verify
- [ ] OpenAI API key obtained
  - Visit [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys) to get one

## Installation Verification

### Docker Installation
- [ ] `.env.local` file created with OpenAI API key
- [ ] Docker container started with `docker-compose up -d`
- [ ] Frontend accessible at [http://localhost:3000](http://localhost:3000)
- [ ] Backend API accessible at [http://localhost:8000](http://localhost:8000)
  - Check with `curl http://localhost:8000` which should return API status

### Manual Installation
- [ ] Python virtual environment created using `setup_venv.bat` (Windows) or `setup_venv.sh` (Linux/macOS)
- [ ] Node.js dependencies installed with `npm install`
- [ ] `.env.local` file created with OpenAI API key
- [ ] Application started with `npm run dev`
- [ ] Frontend accessible at [http://localhost:3000](http://localhost:3000)
- [ ] Backend API accessible at [http://localhost:8000](http://localhost:8000)

## Feature Testing

- [ ] Dashboard loads properly
- [ ] Sample data can be generated and displayed
- [ ] Attack detection works with sample data
- [ ] NopeNet AI Chat Assistant responds to messages
- [ ] Security recommendations are displayed based on scan results
- [ ] Visualization of results works correctly

## Troubleshooting Steps

If any of the above checks fail, refer to the troubleshooting sections in:
- `DOCKER_INSTALL.md` for Docker installation issues
- `README.md` for general installation issues

## Shutdown Verification

### Docker Installation
- [ ] Application shuts down cleanly with `docker-compose down`

### Manual Installation
- [ ] Application stops without errors when terminal is closed or Ctrl+C is pressed

## Desktop Shortcut Verification

- [ ] Desktop shortcut created successfully
- [ ] Application launches correctly from desktop shortcut
- [ ] Browser opens to correct URL when application starts 