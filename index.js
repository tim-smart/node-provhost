'use strict';

var uuid = require('uuid');

exports.parse = function parse(host) {
  var parts = host.split('--');

  var namespace = parts[0];
  var groups    = parts[1] || '';
  var id        = parts[2];

  var groupObjects = [];
  groups.replace(/([A-z]+)(\d+)?/g, function(match, name, count) {
    groupObjects.push({
      name: name,
      count: +count || 1
    });

    return match;
  });

  return {
    namespace: namespace,
    groups: groupObjects,
    id: id || null
  };
};

exports.stringify = function stringify(obj) {
  var host       = {};
  host.namespace = obj.namespace || '';
  host.groups    = obj.groups || [];
  host.id        = obj.id || uuid().split('-')[0];

  host.groups = host.groups.map(function(group) {
    if ('string' === typeof group) {
      return group;
    }

    if (!group.name) { return; }

    var count = null;
    if (1 >= group.count) {
      count = '';
    } else {
      count = group.count || '';
    }

    return group.name + count;
  }).sort();

  return [host.namespace, host.groups.join('-'), host.id].join('--');
};
