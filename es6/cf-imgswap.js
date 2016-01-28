if(module.exports){
  var cubicflow = require('cf-base');
}

cubicflow.extend('imgswap', function(options){

  var cf = this;
  
  const defaultOptions = {
    responsiveClass: '.cf-responsive',
    retinaSuffix: '@2x',
    mediumSuffix: '-med',
    largeSuffix: '-large',
    addRetinaSuffix: true,
  };
  
  options = options || defaultOptions;
  
  
  
  const ResponsiveImg = class {
    constructor(img){
      
      const re = /([\w\d_-]*)\.?[^\\\/]*$/i;
      const compStyle = img.currentStyle || window.getComputedStyle(img, false);

      this.elem = img;
      this.type = (img.nodeName === 'IMG') ? 'img' : 'div';
      this.src = img.src || compStyle.backgroundImage.slice(5, -2);
      this.filename = this.src.match(re)[1];
      this.extension = this.src.split('.').pop();
      this.parentFolder =  this.src.substr(0, this.src.lastIndexOf('/'));
      
    }

    swap(){

    }

    getNewSrc(){
      
      let newSrc = '';
      let retinaSuffix = (options.addRetinaSuffix) ? options.retinaSuffix : '';

      // SMALL AND NOT 2X
      if (cf.isSmallBrowser() && !cf.isRetina()){
        newSrc = this.parentFolder + '/' + this.filename + '.' + this.extension;
      }

      // MEDIUM BROWSERS AND NOT 2X
      else if (cf.isMediumBrowser() && !cf.isRetina()){
        newSrc = this.parentFolder + '/' + this.filename + options.mediumSuffix + '.' + this.extension;
      }

      // LARGE AND NOT 2x
      else if (cf.isLargeBrowser() && !cf.isRetina()){
        newSrc = this.parentFolder + '/' + this.filename + options.largeSuffix + '.' + this.extension;
      }
      
      // SMALL AND 2X
      else if (cf.isSmallBrowser() && cf.isRetina()){
        newSrc = asset.parentFolder + '/' + asset.filename + retinaSuffix + '.' + asset.extension;
      }
      // MEDIUM BROWSERS AND 2X
      else if (cf.isMediumBrowser() && cf.isRetina()){
        newSrc = asset.parentFolder + '/' + asset.filename + mediumSuffix + retinaSuffix + '.' + asset.extension;
      }
      // LARGE BROWSER AND IS X2
      else if (cf.isLargeBrowser() && cf.isRetina()){
        newSrc = asset.parentFolder + '/' + asset.filename + largeSuffix + retinaSuffix + '.' + asset.extension;
      }


      return newSrc;
    }
  }
  
  const _getImagesArray = function(){
    
    let responsiveImages = [];
    let images = document.querySelectorAll(options.responsiveClass);
      
    for (var i=0;i<images.length;i++){
      let image = new ResponsiveImg(images[i])
      responsiveImages.push(image);
    }
    
    return responsiveImages;
    
  };
  
  const _init = function(options){

    let allResponsiveImages = _getImagesArray();
    
    return allResponsiveImages;

  };
  
  return _init(options);
  
});