@echo off

:restart
git pull origin main
node index.js
echo Restarting...

timeout /t 5
goto restart