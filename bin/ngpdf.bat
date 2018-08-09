@echo off   
%~d0
cd %~dp0 
cd .. 
phantomjs.exe %cd%\pdf\ngpdf.js %1 %2 %3 %4
