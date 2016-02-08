'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!cf) {
  var cf = {};
}

// Helper functions for detecting viewport
// Each returns a boolean
cf.isRetina = function (opts) {
  if (!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined;
  }
  if (window.matchMedia) {
    var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
    return mq && mq.matches || window.devicePixelRatio > 1;
  } else {
    return false;
  }
};

cf.isSmallBrowser = function (opts) {
  if (!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined;
  }
  return window.innerWidth <= opts.smallBrowserWidth;
};

cf.isMediumBrowser = function (opts) {
  if (!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined;
  }
  return window.innerWidth > opts.smallBrowserWidth && window.innerWidth <= opts.mediumBrowserWidth;
};

cf.isLargeBrowser = function (opts) {
  if (!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined;
  }
  return window.innerWidth >= opts.mediumBrowserWidth;
};

// Main Method
cf.imgSwap = function (opts) {

  // Default Options
  var defaultOpts = {
    responsiveClass: '.cf-responsive',
    mediumSuffix: '-med',
    addMediumSuffix: true,
    largeSuffix: '-large',
    addLargeSuffix: true,
    addRetinaSuffix: true,
    retinaSuffix: '@2x',
    smallBrowserWidth: 600,
    mediumBrowserWidth: 1025,
    largeBrowserWidth: 1280
  };

  // Merge default options with passed options. ( Needs es6 object.assign transform plugin )
  opts = _extends({}, defaultOpts, opts);

  // Main list class. Holds all the responsive images and provides methods to effect all of them
  // Constructor takes a options object as param
  // Gets instantiated and returned at the bottom of the file
  var ImgList = function () {
    function ImgList(opts) {
      var _this = this;

      _classCallCheck(this, ImgList);

      this.responsiveImages = [];

      this.opts = opts;

      var images = document.querySelectorAll(this.opts.responsiveClass);

      for (var i = 0; i < images.length; i++) {
        var image = new ResponsiveImg(images[i]);
        this.responsiveImages.push(image);
      }

      this.swapImgs(this.responsiveImages);

      window.addEventListener('resize', function () {
        window.requestAnimationFrame(function () {
          _this.swapImgs(_this.responsiveImages);
        });
      });
    }

    // Swaps all images.

    _createClass(ImgList, [{
      key: 'swapImgs',
      value: function swapImgs() {
        for (var i in this.responsiveImages) {
          this.responsiveImages[i].swapSrc();
        }
      }
    }, {
      key: 'imageIsAlreadyInArray',

      // Checkes to see if the image is new. Takes an image element as a param.
      value: function imageIsAlreadyInArray(image) {
        var newImage = this.responsiveImages.filter(function (item, index, array) {
          return item.elem == image;
        });

        return newImage.length > 0;
      }

      // Checks for new images then swap.

    }, {
      key: 'reflow',
      value: function reflow() {

        var images = document.querySelectorAll(this.opts.responsiveClass);

        for (var i = 0; i < images.length; i++) {
          if (this.imageIsAlreadyInArray(images[i]) === false) {
            this.responsiveImages.push(new ResponsiveImg(images[i]));
          }
        }

        this.swapImgs();

        return this;
      }
    }]);

    return ImgList;
  }();

  // Class for each image.
  // Constructor takes a DOM Node as param
  var ResponsiveImg = function () {
    function ResponsiveImg(img) {
      _classCallCheck(this, ResponsiveImg);

      // Regex for getting file name from URL
      var re = /([\w\d_-]*)\.?[^\\\/]*$/i;

      // Regex for getting file name from CSS bgimage
      var bgImgRe = /(?:\(['|"]?)(.*?)(?:['|"]?\))/;

      var compStyle = img.currentStyle || window.getComputedStyle(img, false);

      this.elem = img;
      this.type = img.nodeName === 'IMG' ? 'img' : 'div';
      this.src = img.src || bgImgRe.exec(compStyle.backgroundImage)[1];
      this.filename = this.src.match(re)[1];
      this.extension = this.src.split('.').pop();
      this.parentFolder = this.src.substr(0, this.src.lastIndexOf('/'));
      this.currentSrc = this.src;
    }

    // Swap out the img src with new one.

    _createClass(ResponsiveImg, [{
      key: 'swapSrc',
      value: function swapSrc() {

        var newSrc = this.getNewSrc();

        if (newSrc === this.currentSrc) return;

        if (this.type === 'img') {
          this.elem.src = newSrc;
        } else if (this.type === 'div') {
          this.elem.style.backgroundImage = 'url(' + newSrc + ')';
        }
        this.currentSrc = newSrc;
      }

      // Returns what the new source for the image should be.

    }, {
      key: 'getNewSrc',
      value: function getNewSrc() {

        var newSrc = '';
        var retinaSuffix = opts.addRetinaSuffix ? opts.retinaSuffix : '';
        var mediumSuffix = opts.addMediumSuffix ? opts.mediumSuffix : '';
        var largeSuffix = opts.addLargeSuffix ? opts.largeSuffix : '';

        // SMALL AND NOT 2X
        if (cf.isSmallBrowser(opts) && !cf.isRetina(opts)) {
          newSrc = this.parentFolder + '/' + this.filename + '.' + this.extension;
        }

        // MEDIUM BROWSERS AND NOT 2X
        else if (cf.isMediumBrowser(opts) && !cf.isRetina(opts)) {
            newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + '.' + this.extension;
          }

          // LARGE AND NOT 2x
          else if (cf.isLargeBrowser(opts) && !cf.isRetina(opts)) {
              newSrc = this.parentFolder + '/' + this.filename + largeSuffix + '.' + this.extension;
            }

            // SMALL AND 2X
            else if (cf.isSmallBrowser(opts) && cf.isRetina(opts)) {
                newSrc = this.parentFolder + '/' + this.filename + retinaSuffix + '.' + this.extension;
              }
              // MEDIUM BROWSERS AND 2X
              else if (cf.isMediumBrowser(opts) && cf.isRetina(opts)) {
                  newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + retinaSuffix + '.' + this.extension;
                }
                // LARGE BROWSER AND IS X2
                else if (cf.isLargeBrowser(opts) && cf.isRetina(opts)) {
                    newSrc = this.parentFolder + '/' + this.filename + largeSuffix + retinaSuffix + '.' + this.extension;
                  }

        return newSrc;
      }
    }]);

    return ResponsiveImg;
  }();

  // Kick everything off by returning a new ImgList!
  return new ImgList(opts);
};

// Export CommonJS module
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = cf;
  }
}