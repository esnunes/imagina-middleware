
'use strict';

var fs = require('fs');
var path = require('path');
var Imagina = require('imagina');

var middleware = module.exports = function(opts) {
  opts = opts || {};

  opts.imagina = opts.imagina || {};
  if (!(opts.imagina instanceof Imagina)) {
    opts.imagina = new Imagina(opts.imagina);
  }

  if (!opts.root) throw new Error('root path required');

  opts.extract = opts.extract || defaultExtract;

  return function(req, res, next) {
    var info = opts.extract(opts, req);

    if (!info) return next();

    fs.exists(info.dst, function(exists) {
      if (exists) return next();

      if (opts.resolutions && opts.resolutions.indexOf(info.resolution) == -1) return res.send(403, 'invalid resolution');

      fs.exists(info.src, function(exists) {
        if (!exists) return next();

        opts.imagina.resize(info.src, info.dst, info.resolution, null, next);
      });
    });
  };
};

var defaultExtract = function(opts, req) {
  var regexp = /^(.*[^\/])\-([0-9]+x[0-9]+)(\.jpg|\.png)$/;
  var groups = regexp.exec(req.path);

  if (!groups) return null; // return null if invalid

  var result = {};

  result.resolution = groups[2];
  result.src = path.join(opts.root, groups[1] + groups[3]);
  result.dst = path.join(opts.root, req.path);

  return result;
};
