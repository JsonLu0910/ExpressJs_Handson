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

REM Check if the FTP command was successful
if %errorlevel% equ 0 (
  echo File transfer complete.
) else (
  echo File transfer failed.
)

@REM for /f "tokens=3,2,4 delims=/- " %%x in ("%date%") do set d=%%y%%x%%z

@REM set data=%d%

@REM Echo zipping...

@REM "C:\Program Files\7-Zip\7z.exe" a -tzip "C:\Users\arkmind\Documents\GitHub\ExpressJSHandson.zip" "C:\Users\arkmind\Documents\GitHub\ExpressJs_Handson"
@REM @echo off

@REM REM FTP login credentials
@REM set FTP_HOST=0.tcp.ap.ngrok.io 11352
@REM set FTP_USER=user
@REM set FTP_PASS=123

@REM REM FTP file path and local file path
@REM set FILE_TO_TRANSFER=ExpressJSHandson.zip
@REM set LOCAL_FILE=C:\Users\arkmind\Documents\GitHub

@REM REM Attempt to download the file via FTP
@REM echo open %FTP_HOST%> ftpcommands.txt
@REM echo %FTP_USER%>> ftpcommands.txt
@REM echo %FTP_PASS%>> ftpcommands.txt
@REM echo lcd %LOCAL_FILE%>> ftpcommands.txt
@REM echo put %FILE_TO_TRANSFER%>> ftpcommands.txt
@REM echo quit>> ftpcommands.txt

@REM ftp -i -s:ftpcommands.txt

@REM REM Check if the FTP command was successful
@REM if %ERRORLEVEL% equ 0 (
@REM   echo File transfer complete.
@REM ) else (
@REM   echo File transfer failed.
@REM )

@REM del ftpcommands.txt

@REM @REM -c "0/Test1" 

@REM filezilla.exe "ftp://user:123@13.229.3.203:16568/"  -a "C:\Users\arkmind\Desktop\Work\TextFile"