'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.cubicflow = function () {

  // Call to instantiate CF class and get things rolling
  var init = function init(opts) {

    opts = opts || {};

    return new Cubicflow(opts);
  };

  var Cubicflow = function () {
    function Cubicflow(opts) {
      _classCallCheck(this, Cubicflow);

      this.smallBrowser = opts.smallBrowserWidth || 600;
      this.medBrowser = opts.mediumBrowserWidth || 1025;
      this.largeBrowser = opts.largeBrowserWidth || 1280;
    }

    _createClass(Cubicflow, [{
      key: 'isRetina',
      value: function isRetina() {
        if (window.matchMedia) {
          var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
          return mq && mq.matches || window.devicePixelRatio > 1;
        } else {
          return false;
        }
      }
    }, {
      key: 'isSmallBrowser',
      value: function isSmallBrowser() {
        if (window.innerWidth <= this.smallBrowser) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'isMobile',
      value: function isMobile() {

        var mobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (window.innerWidth < cf.opts.smallBrowser || mobileDevice) {
          return true;
        } else {
          return false;
        }
      }
    }]);

    return Cubicflow;
  }();

  var extend = function extend(name, fn) {

    if (!(typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) === 'function') return console.log('fn must be a function');
    if (!(typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'string') return console.log('name must be a string');

    Cubicflow.prototype[name] = fn;
  };

  return {
    init: init,
    extend: extend
  };
}();

if (module.exports) {
  module.exports = cubicflow;
}