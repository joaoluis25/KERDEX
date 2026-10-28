@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js nao encontrado. Instale pelo endereco https://nodejs.org/
  pause
  exit /b 1
)
set "PORT=3001"
echo.
echo  KERDEX BETA 3.0 - Demonstracao local
 echo  Abra http://localhost:3001 no navegador
 echo  Mantenha esta janela aberta. Ctrl+C encerra o servidor.
 echo.
node tools\server.cjs
if errorlevel 1 (
 echo O servidor nao conseguiu iniciar. Verifique se a porta 3001 ja esta ocupada.
 pause
)
