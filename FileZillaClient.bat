@echo off
setlocal

echo Running the try block...
open 0.tcp.ap.ngrok.io 17346
user
123
lcd C:\Users\arkmind\Documents\GitHub
put ExpressJSHandson.zip
bye
REM Try block

set "errorlevel="
( command1 && command2 && command3 ) || set "errorlevel=1"

REM Catch block
if defined errorlevel (
    echo An error occurred. Handling the error...
    REM Error handling code goes here
    bye
    exit /b 1

)
