@echo off   
%~d0
cd %~dp0 
cd .. 
phantomjs.exe %cd%\html2base64\rasterize_out.js %1 %2 30000 #containeroutput
pngquant --force --verbose --quality=45-85 %2
exit /b 1