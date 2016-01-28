'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (module.exports) {
  var cubicflow = require('cf-base');
}

cubicflow.extend('imgswap', function (options) {

  var cf = this;

  var defaultOptions = {
    responsiveClass: '.cf-responsive',
    retinaSuffix: '@2x',
    mediumSuffix: '-med',
    largeSuffix: '-large',
    addRetinaSuffix: true
  };

  options = options || defaultOptions;

  var ResponsiveImg = function () {
    function ResponsiveImg(img) {
      _classCallCheck(this, ResponsiveImg);

      var re = /([\w\d_-]*)\.?[^\\\/]*$/i;
      var compStyle = img.currentStyle || window.getComputedStyle(img, false);

      this.elem = img;
      this.type = img.nodeName === 'IMG' ? 'img' : 'div';
      this.src = img.src || compStyle.backgroundImage.slice(5, -2);
      this.filename = this.src.match(re)[1];
      this.extension = this.src.split('.').pop();
      this.parentFolder = this.src.substr(0, this.src.lastIndexOf('/'));
    }

    _createClass(ResponsiveImg, [{
      key: 'swap',
      value: function swap() {}
    }, {
      key: 'getNewSrc',
      value: function getNewSrc() {

        var newSrc = '';
        var retinaSuffix = options.addRetinaSuffix ? options.retinaSuffix : '';

        // SMALL AND NOT 2X
        if (cf.isSmallBrowser() && !cf.isRetina()) {
          newSrc = this.parentFolder + '/' + this.filename + '.' + this.extension;
        }

        // MEDIUM BROWSERS AND NOT 2X
        else if (cf.isMediumBrowser() && !cf.isRetina()) {
            newSrc = this.parentFolder + '/' + this.filename + options.mediumSuffix + '.' + this.extension;
          }

          // LARGE AND NOT 2x
          else if (cf.isLargeBrowser() && !cf.isRetina()) {
              newSrc = this.parentFolder + '/' + this.filename + options.largeSuffix + '.' + this.extension;
            }

            // SMALL AND 2X
            else if (cf.isSmallBrowser() && cf.isRetina()) {
                newSrc = asset.parentFolder + '/' + asset.filename + retinaSuffix + '.' + asset.extension;
              }
              // MEDIUM BROWSERS AND 2X
              else if (cf.isMediumBrowser() && cf.isRetina()) {
                  newSrc = asset.parentFolder + '/' + asset.filename + mediumSuffix + retinaSuffix + '.' + asset.extension;
                }
                // LARGE BROWSER AND IS X2
                else if (cf.isLargeBrowser() && cf.isRetina()) {
                    newSrc = asset.parentFolder + '/' + asset.filename + largeSuffix + retinaSuffix + '.' + asset.extension;
                  }

        return newSrc;
      }
    }]);

    return ResponsiveImg;
  }();

  var _getImagesArray = function _getImagesArray() {

    var responsiveImages = [];
    var images = document.querySelectorAll(options.responsiveClass);

    for (var i = 0; i < images.length; i++) {
      var image = new ResponsiveImg(images[i]);
      responsiveImages.push(image);
    }

    return responsiveImages;
  };

  var _init = function _init(options) {

    var allResponsiveImages = _getImagesArray();

    return allResponsiveImages;
  };

  return _init(options);
});