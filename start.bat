@echo off

:restart
node index.js
echo Restarting...

timeout /t 5
goto restart