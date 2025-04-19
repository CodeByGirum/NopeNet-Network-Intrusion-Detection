@echo off
echo Starting NopeNet...
cd %~dp0
docker-compose up -d
echo NopeNet is running!
echo Open your browser and go to: http://localhost:3000
pause 