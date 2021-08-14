'use strict';

var clamp        = require('clamp');
var randomNatual = require('random-natural');

var SCHEMA = '{token1}.{token2}.{token3}.{token4}';
var MAX    = 255;

function genPart(options) {

  var min = parseInt(options.min, 10);
  var max = parseInt(options.max, 10);

  if (isNaN(min) || !isFinite(min)) {
    min = 0;
  }

  if (isNaN(max) || !isFinite(max)) {
    max = MAX;
  }

  min = clamp(min, 0, MAX);
  max = clamp(max, 0, MAX);

  return randomNatual({ min: min, max: max, inspected: true });
}

function checkPart(part) {

  if (part.match(/^\s*\{\s*[a-zA-Z0-9_-]*\s*\}\s*$/)) {
    return true;
  }

  part = parseInt(part, 10);

  return !isNaN(part) && isFinite(part) && part >= 0 && part <= MAX;
}

function checkParts(parts) {

  for (var i = 0, l = parts.length; i < l; i++) {
    if (!checkPart(parts[i])) {
      return false;
    }
  }

  return true;
}


module.exports = function (schema, options) {

  if (typeof schema === 'object') {
    options = schema;
    schema  = SCHEMA;
  }

  schema  = schema || SCHEMA;
  options = options || {};

  var parts = schema.split('.');

  if (parts.length !== 4 || !checkParts(parts)) {
    throw new TypeError('Invalided schema: ' + schema);
  }

  return schema.replace(/\s*\{\s*([a-zA-Z0-9_-]*)\s*\}\s*/g,
    function (input, token) {
      return genPart(options[token] || {});
    });
};
