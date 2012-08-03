#!/bin/bash

cat index.js example/i18next.js > bundle.js

echo "curl -u $1 -sSNT bundle.js" \
"'"'http://testling.com/?browsers=chrome/14.0'\
'&script=https://raw.github.com/jamuhl/i18next/master/i18next-1.4.0.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/eventemitter2.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/jquery-1.7.2.min.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/eventemitter2.js'\
'&script=https://raw.github.com/dilvie/applitude/master/lib/o.js'\
'&script=https://raw.github.com/dilvie/applitude/master/applitude.js'\
'&script=https://raw.github.com/dilvie/applitude/master/app.js'\
'&script=https://raw.github.com/dilvie/applitude/master/applitude-utils.js'\
'&script=https://raw.github.com/gist/3252039/17be1f098c54fa46d0c5478da68dc1528859e456/i18next-applitude-module.js'
"&noinstrument'"
