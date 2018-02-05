ECHO OFF

SET DIR=%~dp0

CALL %DIR%\test_1.cmd

IF ERRORLEVEL 1 (
    ECHO %ERRORLEVEL% test failed
    EXIT /B 1
)