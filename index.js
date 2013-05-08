var outputter = require('./lib/output.js');
function makeConsole(output, options) {
  var exports = {};
  options = options || {};
  output = outputter(output);
  var _formatJS = options.formatJS || formatJS;
  var _formatObj = options.formatObj || formatObj;
  var _formatStr = options.formatStr || formatStr;

  exports.echo = function (src) {
    output.write('echo', _formatJS(src));
  };
  exports.response = function (obj) {
    output.write('response', _formatObj(obj, _formatJS));
  };
  exports.html = function (html) {
    output.write('html', html);
  }
  exports.toString = function () {
    return output.toString();
  };

  exports.dir = function (obj) {
    output.write('log', _formatObj(obj, _formatJS));
  };

  function log(clss) {
    return function (msg) {
      if (arguments.length === 1 && typeof msg === 'string') {
        output.write(clss, _formatStr(msg));
      } else if (arguments.length === 1) {
        output.write(clss, _formatObj(msg, _formatJS));
      } else {
        var args = [];
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        var msg = formatStr(args.shift());
        msg.replace(/%([A-Za-z])/g, function (_, format) {
          if (args.length === 0) return _;
          else return _formatObj(args.shift(), _formatJS);
        });
        for (var i = 0; i < args.length; i++) {
          if (typeof args[i] === 'string') msg += ' ' + formatStr(args[i]);
          else msg += ' ' + _formatObj(args[i], _formatJS);
        }
        output.write(clss, msg);
      }
    };
  }
  exports.error = log('error');
  exports.info = log('info');
  exports.log = log('log');
  exports.warn = log('warn');

  return exports;
}

function escape(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
}
function formatJS(src) {
  return escape(src);
}
function formatObj(obj, formatJS) {
  return formatJS(JSON.stringify(obj));
}
function formatStr(src) {
  return escape(src);
}