@echo off   
%~d0
cd %~dp0 
cd ..
phantomjs.exe %cd%\html2base64\rasterize.js http://w3uy006a:8089/report/one_page_report_line?lineno=%1 7000 #report_table