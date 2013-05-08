var makeConsole = require('../');
var console = makeConsole();

console.info('foo');
console.log('foo');
console.warn('bar', {foo: 'bar'});
console.dir({foo: 'bar'});
console.error({foo: 'bar'});

process.stdout.write('<meta charset="utf8">\n'+
                     '<link rel="stylesheet" href="../style.css"/>\n');
process.stdout.write(console.toString());
