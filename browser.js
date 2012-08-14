var _testling = require('testling');
var push = require('/push');
var _test;
var _before;
var _after;
var _testDesc;

function describe (suite, cb) {
    _testling(suite, function (t) {
        _test = t;
        _before = [];
        _after = [];
        t.queue = [];
        cb();
        if (!t._pending) t.end();
    });
}

function it (desc, cb) {
    if (_test._pending) {
        return _test.queue.push(function () {
            it(desc, cb);
        });
    }
    _testDesc = desc;
    cb();
}

function expect (value) {
    return {
        toBeDefined : function () {
            _test.ok(value !== undefined, _testDesc);
        },
        toBeUndefined : function () {
            _test.ok(value === undefined, _testDesc);
        },
        toBe : function(x) {
            _test.strictEqual(value, x, _testDesc);
        },
        notToBe : function(x) {
            _test.notStrictEqual(value, x, _testDesc);
        },
        toBeNull : function () {
            _test.ok(value === null, _testDesc);
        },
        toBeTruthy : function () {
            _test.ok(value, _testDesc);
        },
        toBeFalsy : function () {
            _test.notOk(value, _testDesc);
        },
        toEqual : function (x) {
            _test.equal(value, x, _testDesc);
        },
        toBeLessThan : function(x) {
            _test.ok(value < x, _testDesc);
        },
        toBeGreaterThan : function(x) {
            _test.ok(value > x, _testDesc);
        },
        toThrow : function(x) {
            _test(value, x, _testDesc);
        },
        toContain : function(x) {
            // ...
        },
        toBeCloseTo : function(x) {
            // ...
        },
        toNotContain : function(x) {
            // ...
        },
        toHaveBeenCalled : function () {
            // ...
        },
        toHaveBeenCalledWith : function () {
            // ...
        },
        wasNotCalledWith : function () {
            // ...
        },
        wasNotCalled : function() {
            // ...
        }
    };
}

function waitsFor (cb) {
    var test = _test;
    test._pending = true;
    
    var iv = setInterval(function () {
        if (cb()) {
            clearInterval(iv);
            
            _test = test;
            test._pending = false;
            
            var xs = test.queue.splice(0);
            for (var i = 0; i < xs.length; i++) {
                xs[i]();
            }
            
            if (test.queue.length === 0) test.end();
        }
    }, 100);
}

function runs (cb) {
    if (_test._pending) _test.queue.push(cb);
    else cb();
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

function beforeEach (cb) {
    _before.splice(0, 0, cb);
}

function afterEach (cb) {
    _after.splice(0, 0, cb);
}
