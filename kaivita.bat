@echo off
setlocal

cd /d "%~dp0"

set "CODEX_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
set "CODEX_PNPM=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pnpm\bin\pnpm.cjs"
set "PROGRAM_FILES_NODE=C:\Program Files\nodejs\node.exe"
set "PROGRAM_FILES_NPM=C:\Program Files\nodejs\npm.cmd"
set "CHROME_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
set "NODE_CMD="
set "NPM_CMD="

where node >nul 2>nul
if %errorlevel%==0 set "NODE_CMD=node"

if not defined NODE_CMD (
  if exist "%CODEX_NODE%" set "NODE_CMD=%CODEX_NODE%"
)

if not defined NODE_CMD (
  if exist "%PROGRAM_FILES_NODE%" set "NODE_CMD=%PROGRAM_FILES_NODE%"
)

if not defined NODE_CMD (
  echo Node.js ei ole arvutis leitav.
  echo Paigalda Node.js aadressilt https://nodejs.org/ ja kaivita see fail uuesti.
  pause
  exit /b 1
)

if exist "%PROGRAM_FILES_NODE%" set "PATH=C:\Program Files\nodejs;%PATH%"

if not exist "node_modules\vite\bin\vite.js" (
  echo Paigaldan projekti soltuvused...
  call :install_dependencies
  if errorlevel 1 (
    echo.
    echo Soltuvuste paigaldamine ebaonnestus.
    pause
    exit /b 1
  )
)

echo.
echo Kaivitan Raim Ruudus kodulehe...
echo Brauser avaneb automaatselt. Kui ei avane, vaata terminalis kuvatud Local aadressi.
echo Sulgemiseks vajuta siin aknas Ctrl+C.
echo.

if exist "%CHROME_EXE%" set "BROWSER=%CHROME_EXE%"
"%NODE_CMD%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --open
pause
exit /b 0

:install_dependencies
where pnpm >nul 2>nul
if %errorlevel%==0 (
  pnpm install
  exit /b %errorlevel%
)

where npm >nul 2>nul
if %errorlevel%==0 (
  npm install --no-package-lock --cache "%~dp0.npm-cache"
  exit /b %errorlevel%
)

if exist "%PROGRAM_FILES_NPM%" (
  "%PROGRAM_FILES_NPM%" install --no-package-lock --cache "%~dp0.npm-cache"
  exit /b %errorlevel%
)

if exist "%CODEX_PNPM%" (
  set "PATH=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;%PATH%"
  "%NODE_CMD%" "%CODEX_PNPM%" install
  exit /b %errorlevel%
)

echo Ei leidnud pnpm ega npm pakihaldurit.
echo Paigalda Node.js aadressilt https://nodejs.org/.
exit /b 1
