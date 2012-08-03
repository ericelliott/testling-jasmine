#!/bin/bash

cat index.js example/test.js > bundle.js

echo "curl -u $1 -sSNT bundle.js" \
"'"'http://testling.com/?browsers=chrome/14.0'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/eventemitter2.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/jquery-1.7.2.min.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/eventemitter2.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/o.js'\
'&script=https://raw.github.com/dilvie/applitude/master/applitude.js'\
'&script=https://raw.github.com/dilvie/applitude/master/app.js'\
'&script=https://raw.github.com/dilvie/applitude/master/applitude-utils.js'\
"&noinstrument'"
