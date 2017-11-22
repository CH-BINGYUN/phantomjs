@echo off   
%~d0
cd %~dp0 
cd .. 
phantomjs.exe %cd%\pdf\pdf.js %1 %2 %3
