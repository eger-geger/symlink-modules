ROOT=$(dirname $0)../fixtures/f1
TEMP=temp

if [ -d $TEMP ]; then
    rm -rf $TEMP
fi

mkdir $TEMP

if ! [ -d LOGS ]; then
    mkdir LOGS
fi

node cli.js -r tests/fixtures/f1 -d $TEMP pkga pkgc >LOGS/1_2.log 2>&1

if ! [ -d $TEMP/pkga ]; then
    echo ERROR: pkga not linked
    exit 1
else
    echo TEST 1: pkga linked
fi

if ! [ -d $TEMP/pkgc ]; then
    echo ERROR: pkgc not linked
    exit 2
else
    echo TEST 2: pkgb linked
fi

node cli.js -r asfjkasjflkfjas >LOGS/3.log 2>&1

if [ $? -eq 0 ]; then
    echo ERROR: did not fail with invalid root
    exit 3
else
    echo TEST 3: command failed
fi

exit 0