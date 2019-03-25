const md5File = require('md5-file');
 
/* Sync usage */
const hash = md5File.sync('cksm0');
console.log(`The MD5 sum of LICENSE is: ${hash}`);