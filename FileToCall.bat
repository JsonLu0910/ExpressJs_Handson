@echo off
setlocal

echo Running the try block...
echo on

for /f "tokens=3,2,4 delims=/- " %%x in ("%date%") do set d=%%y%%x%%z

set data=%d%

Echo zipping...

"C:\Program Files\7-Zip\7z.exe" a -tzip "C:\Users\arkmind\Documents\GitHub\ExpressJSHandson.zip" "C:\Users\arkmind\Documents\GitHub\ExpressJs_Handson"

echo done!

ftp -i -s:FileZillaClient.bat

if %errorlevel% EQU 0 ( echo no error) else (echo got error)
