SET ROOT=%~dp0\..\fixtures\f1
SET TEMP=temp

IF EXIST %TEMP% (
    RD /S /Q %TEMP%
)

IF NOT EXIST LOGS (
    MKDIR LOGS
)

MKDIR %TEMP%

node cli.js -r %ROOT% -d %TEMP% pkga pkgc >LOGS\1_2.log 2>&1

IF NOT EXIST %TEMP%\pkga (
    ECHO ERROR: pkga not linked
    EXIT /B 1
) ELSE (
    ECHO TEST 1: pkga linked
)

IF NOT EXIST %TEMP%\pkgc (
    ECHO ERROR: pkgc not linked
    EXIT /B 2
) ELSE (
    ECHO TEST 2: pkgb linked
)

node cli.js -r asfjkasjflkfjas >LOGS\3.log 2>&1

IF %ERRORLEVEL% EQU 0 (
    ECHO ERROR: did not fail with invalid root
    EXIT /B 3
) ELSE (
    ECHO TEST 3: command failed
)

EXIT /B 0