#!/usr/bin/env node
const chunk = require('../dist/index.js');
console.log(chunk(process.argv[2], Number.parseInt(process.argv[3], 10), typeof process.argv[4] !== 'undefined' && process.argv[4] !== null && process.argv[4] !== '' ? JSON.parse(process.argv[4]) : ''));
