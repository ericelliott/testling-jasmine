#!/usr/bin/env node

var request = require('request');
var qs = require('querystring');
var fs = require('fs');
var path = require('path');
var deepMerge = require('deepmerge');
var read = require('read');
var checkSyntax = require('syntax-error');

var argv = require('optimist').argv;
var files = [ __dirname + '/../browser.js' ].concat(argv._)
    .reduce(function (acc, file) {
        var ext = path.extname(file).replace(/^\./, '');
        if (!acc[ext]) acc[ext] = [];
        acc[ext].push(file);
        return acc;
    }, {})
;
if (files.js.length === 1) {
    return console.error(
        'Usage: testling-jasmine OPTIONS [json files, test files]'
    );
}
var sources = files.js.map(function (file) {
    return fs.readFileSync(file, 'utf8');
});

var ok = sources.every(function (src, ix) {
    var err = checkSyntax(src, files.js[ix]);
    if (err) {
        console.error(err);
        return false;
    }
    return true;
});
if (!ok) process.exit(1);

var body = [
    'module=undefined',
    'exports=undefined',
    '(function () {',
    sources.join(';\n'),
    '}).call(window)',
].join(';\n');

var config = (files.json || []).reduce(function (acc, file) {
    return deepMerge(acc, JSON.parse(fs.readFileSync(file)));
}, argv);

var params = {
    script : config.script || config.scripts,
    browsers : Array.isArray(config.browsers)
        ? config.browsers.join(',')
        : config.browsers
    ,
};
if (!config.browsers) delete params.browsers;
if (!config.script) delete params.script;

if (config.user) {
    withUser(config.user);
}
else {
    read({ prompt : 'username: ' }, function (err, res) {
        if (err) console.error(err)
        else withUser(res)
    });
}

function withUser (user) {
    if (!config.pass) {
        read({ prompt : 'password: ', silent : true }, function (err, res) {
            if (err) console.error(err)
            else withAuth(user, res)
        });
    }
    else withAuth(user, config.pass)
}

function withAuth (user, pass) {
    var uri = 'http://'
        + encodeURIComponent(user) + ':'
        + encodeURIComponent(pass) + '@'
        + 'testling.com/'
        + '?' + qs.stringify(params)
        + (config.instrument ? '' : '&noinstrument')
    ;
    
    if (argv.print) {
        return console.log(uri);
    }
    
    var r = request.put({ uri : uri, body : body });
    r.pipe(process.stdout, { end : false });
}
