exports=undefined;
(function () {
var _testling = require('testling');
var push = require('/push');
var _suite;
var _test;
var _queue;

function log (msg) {
    push('log', {message: msg});    
}

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
            log('cb returned true');
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

function beforeEach () {
}

function afterEach () {
}
(function () {
  'use strict';

  var timedOut = false;

  setTimeout(function () {
    timedOut = true;
  }, 1000);

  describe('timer', function () {
    it('should not be timed out yet', function () {
      expect(timedOut).toEqual(false);
    });
  });

  describe('timer', function () {
    waitsFor(function () {
      return timedOut === true;
    });

    it('should be timed out', function () {
      expect(timedOut).toEqual(true);
    });
  });

}());
}).call(window)
