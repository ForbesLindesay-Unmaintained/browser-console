module.exports = outputter;
function outputter(output) {
  output = output || [];
  var exports = {};
  exports.write = function (cls, msg) {
    output.push('<li class="' + cls + '">' +
      '<span class="gutter"></span>' +
      '<div>' + msg + '</div>' +
      '</li>');
  };
  exports.toString = function () {
    return '<ul class="browser-console">\n' + output.join('\n') + '\n</ul>';
  };
  return exports;
}