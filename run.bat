@echo off

node -v >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed.
    powershell -Command "Add-Type -AssemblyName System.Windows.Forms; $result = [System.Windows.Forms.MessageBox]::Show('This program requires an installation of Node.js, click Install to open the download page.', 'Ticketing Bot - Node.js Not Found', [System.Windows.Forms.MessageBoxButtons]::OKCancel, [System.Windows.Forms.MessageBoxIcon]::Warning); if ($result -eq [System.Windows.Forms.DialogResult]::OK) { Start-Process 'https://nodejs.org/' }"
) else (
    
    echo Node.js is installed.
    echo Running npm install...
    timeout /t 1 /nobreak >nul
    npm install

    if %ERRORLEVEL% EQU 0 (
        cls
        echo npm install completed successfully.
        echo Running node index.js...
        timeout /t 2 /nobreak >nul
        node index.js
        cls
    ) else (
        echo npm install failed.
    )
)

pause
