var test = require('testling');

module.exports = function (suite, cb) {
    var context = {};
    
    context.it = function (desc, cb) {
        test(suite + ':' + desc, function (t) {
            createTest(t, cb);
        });
    };
    
    callWith(context, cb);
};

function createTest (t, cb) {
    var context = {};
    context.expect = function (value) {
        return {
            toBeDefined : function () {
                t.ok(value !== undefined);
            }
        }
    };
    callWith(context, cb);
    t.end();
}

function callWith (context, cb) {
    var vars = [], args = [];
    for (var key in context) {
        vars.push(key);
        args.push(context[key]);
    }
    
    var fn = Function(vars, '(' + cb + ')()');
    return fn.apply(null, args);
}
