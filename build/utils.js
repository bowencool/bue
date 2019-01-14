const path = require('path');

exports.resolve = (...p) => path.resolve(__dirname, '..', ...p);
