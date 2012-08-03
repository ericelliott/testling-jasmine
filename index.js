var _testling = require('testling');
var _suite;
var _test;
var _queue;

function describe (suite, cb) {
    _suite = suite;
    cb();
}

function it (desc, cb) {
    _queue = [];
    _testling(_suite + ':' + desc, function (t) {
        _test = t;
        cb();
        t.end();
    });
}

function expect (value) {
    return {
        toBeDefined : function () {
            _test.ok(value !== undefined);
        },
        toBeTruthy : function () {
            _test.ok(value);
        },
        toEqual : function (x) {
            _test.equal(value, x);
        },
        toHaveBeenCalled : function () {
            
        }
    };
}

function waitsFor (cb) {
    setInterval(function () {
        if (cb()) {
            var xs = _queue.splice(0);
            for (var i = 0; i < xs.length; i++) {
                xs[i]();
            }
        }
    }, 100);
}

function runs (cb) {
    _queue.push(cb);
}

function spyOn (obj, name) {
    var original = obj[name];
    var callThrough = false;
    
    obj[name] = function () {
        
    };
    return {
        andCallThrough : function () {
            callThrough = true;
        }
    }
}
