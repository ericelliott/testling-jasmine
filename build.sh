#!/bin/bash

cat \
    <(echo 'exports=undefined;') \
    <(echo '(function () {') \
    index.js example/test.js \
    <(echo '}).call(window)') \
    > bundle.js

if test -z "$BROWSERS"; then
    BROWSERS=iexplore/9.0
fi

echo "curl -u $1 -sSNT bundle.js" \
"'http://testling.com/?browsers=$BROWSERS"\
'&script=http://applitude.herokuapp.com/lib/eventemitter2.js'\
'&script=http://applitude.herokuapp.com/lib/jquery-1.7.2.min.js'\
'&script=http://applitude.herokuapp.com/lib/eventemitter2.js'\
'&script=http://applitude.herokuapp.com/lib/o.js'\
'&script=http://applitude.herokuapp.com/applitude.js'\
'&script=http://applitude.herokuapp.com/app.js'\
'&script=http://applitude.herokuapp.com/applitude-utils.js'\
"&noinstrument'"
