@echo off
setlocal

echo Running the try block...
echo on

for /f "tokens=3,2,4 delims=/- " %%x in ("%date%") do set d=%%y%%x%%z

set data=%d%

Echo zipping...

"C:\Program Files\7-Zip\7z.exe" a -tzip "C:\Users\arkmind\Documents\GitHub\ExpressJSHandson.zip" "C:\Users\arkmind\Documents\GitHub\ExpressJs_Handson"

echo Done!

ftp -i -s:FileZillaClient.bat

setlocal enableDelayedExpansion
set "error="
(
    REM Code that might cause an error goes here
    command1
    command2
    command3
) || set "error=1"

REM Catch block
if defined error (
    REM Error handling code goes here
    echo An error occurred. Stopping the script...
    exit /b 1
)

