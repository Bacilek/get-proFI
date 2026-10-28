@echo off
rem Builds the app, serves it on localhost:5173 (same origin as `npm run dev`) and opens it in Firefox (fallback: Chrome/Edge app window).
cd /d "%~dp0"
call npm run build >nul 2>&1
if errorlevel 1 (
  echo Build failed. Run "npm run build" to see why.
  pause
  exit /b 1
)
netstat -ano | findstr ":5173 " | findstr LISTENING >nul
if errorlevel 1 start "get-proFI server" /min cmd /c "npx vite preview --port 5173 --strictPort"
timeout /t 3 /nobreak >nul
if exist "%ProgramFiles%\Mozilla Firefox\firefox.exe" (
  start "" "%ProgramFiles%\Mozilla Firefox\firefox.exe" -new-window http://localhost:5173
) else if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
  start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app=http://localhost:5173
) else (
  start "" msedge --app=http://localhost:5173
)
