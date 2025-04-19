@echo off
echo Starting NopeNet...
cd %~dp0
call nopenet_env\Scripts\activate.bat
start http://localhost:3000
npm run dev
echo NopeNet has stopped.
pause 