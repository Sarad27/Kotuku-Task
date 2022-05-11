const nodecache = require('node-cache');
exports.appCache =new nodecache({ stdTTL : 600});
