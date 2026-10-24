@echo off
title I-HSSE Gedung J6 - Server Lokal + AI
cd /d "%~dp0"

echo ============================================================
echo   I-HSSE GEDUNG J6 - Menyalakan website + AI Assistant...
echo ============================================================
echo.
echo Jendela ini JANGAN ditutup selama website dipakai.
echo Website akan terbuka otomatis di browser.
echo.

REM Cari program Node.js
set NODE=
where node >nul 2>nul && set NODE=node

if "%NODE%"=="" (
  echo [X] Node.js tidak ditemukan di komputer ini.
  echo.
  echo     Node.js dipakai untuk menjalankan website sekaligus
  echo     menghubungkan chatbot ke layanan AI (OpenRouter).
  echo.
  echo     Solusi:
  echo       1^) Install Node.js dari https://nodejs.org  ^(pilih LTS^)
  echo       2^) Jalankan ulang file ini
  echo.
  echo     Catatan: tanpa Node.js, video dan chatbot AI tidak jalan.
  echo.
  pause
  exit /b 1
)

echo [OK] Menyalakan server di http://localhost:8000
echo.

REM Buka browser setelah server siap
start "" cmd /c "timeout /t 2 >nul & start http://localhost:8000/index.html"

REM Jalankan server (blokir jendela ini selama aktif)
%NODE% server.js

echo.
echo Server berhenti.
pause
