'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == 'object') {
  var _cubicflow = require('cf-base');
}

cubicflow.extend('imgSwap', function (opts) {

  var cf = this;

  var defaultOpts = {
    responsiveClass: '.cf-responsive',
    mediumSuffix: '-med',
    addMediumSuffix: true,
    largeSuffix: '-large',
    addLargeSuffix: true,
    addRetinaSuffix: true,
    retinaSuffix: '@2x'
  };

  opts = _extends({}, defaultOpts, opts);

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

    _createClass(ImgList, [{
      key: 'swapImgs',
      value: function swapImgs() {
        for (var i in this.responsiveImages) {
          this.responsiveImages[i].swapSrc();
        }
      }
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
    }, {
      key: 'imageIsAlreadyInArray',
      value: function imageIsAlreadyInArray(image) {
        var newImage = this.responsiveImages.filter(function (item, index, array) {
          return item.elem == image;
        });

        return newImage.length > 0;
      }
    }]);

    return ImgList;
  }();

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
      this.currentSrc = this.src;
    }

    _createClass(ResponsiveImg, [{
      key: 'swapSrc',
      value: function swapSrc() {

        var newSrc = this.getNewSrc();

        if (newSrc === this.currentSrc) return;

        if (this.type === 'img') {
          this.elem.src = newSrc;
        } else if (this.type === 'div') {
          this.elem.style.backgroundImage = 'url(\'' + newSrc + '\')';
        }
        this.currentSrc = newSrc;
      }
    }, {
      key: 'getNewSrc',
      value: function getNewSrc() {

        var newSrc = '';
        var retinaSuffix = opts.addRetinaSuffix ? opts.retinaSuffix : '';
        var mediumSuffix = opts.addMediumSuffix ? opts.mediumSuffix : '';
        var largeSuffix = opts.addLargeSuffix ? opts.largeSuffix : '';

        // SMALL AND NOT 2X
        if (cf.isSmallBrowser() && !cf.isRetina()) {
          newSrc = this.parentFolder + '/' + this.filename + '.' + this.extension;
        }

        // MEDIUM BROWSERS AND NOT 2X
        else if (cf.isMediumBrowser() && !cf.isRetina()) {
            newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + '.' + this.extension;
          }

          // LARGE AND NOT 2x
          else if (cf.isLargeBrowser() && !cf.isRetina()) {
              newSrc = this.parentFolder + '/' + this.filename + largeSuffix + '.' + this.extension;
            }

            // SMALL AND 2X
            else if (cf.isSmallBrowser() && cf.isRetina()) {
                newSrc = this.parentFolder + '/' + this.filename + retinaSuffix + '.' + this.extension;
              }
              // MEDIUM BROWSERS AND 2X
              else if (cf.isMediumBrowser() && cf.isRetina()) {
                  newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + retinaSuffix + '.' + this.extension;
                }
                // LARGE BROWSER AND IS X2
                else if (cf.isLargeBrowser() && cf.isRetina()) {
                    newSrc = this.parentFolder + '/' + this.filename + largeSuffix + retinaSuffix + '.' + this.extension;
                  }

        return newSrc;
      }
    }]);

    return ResponsiveImg;
  }();

  return new ImgList(opts);
});