if (!cf){
  var cf = {};
}

cf.isRetina = (opts) => {
  if(!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined
  }
  if (window.matchMedia) {
    var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
    return (mq && mq.matches || (window.devicePixelRatio > 1));
  } else {
    return false;
  }
}

cf.isSmallBrowser = (opts) => {
  if(!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined
  }
  return window.innerWidth <= opts.smallBrowserWidth;
}

cf.isMediumBrowser = (opts) => {
  if(!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined
  }
  return window.innerWidth > opts.smallBrowserWidth && window.innerWidth <= opts.mediumBrowserWidth;
};

cf.isLargeBrowser = (opts) => {
  if(!opts) {
    console.error('must pass options to detect breakpoint');
    return undefined
  }
  return window.innerWidth >= opts.mediumBrowserWidth;
}


cf.imgSwap = (opts) => {
  
  let defaultOpts = {
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
  
  opts = Object.assign({}, defaultOpts, opts);
  
  const ImgList = class {
      
    constructor (opts){
      
      this.responsiveImages = [];
      
      this.opts = opts;
      
      let images = document.querySelectorAll(this.opts.responsiveClass);
      

      for (let i=0;i<images.length;i++){
        const image = new ResponsiveImg(images[i])
        this.responsiveImages.push(image);
      }
      
      this.swapImgs(this.responsiveImages);
      
      window.addEventListener('resize', () => {
        window.requestAnimationFrame( () => {
          this.swapImgs(this.responsiveImages);
        });
      });
      
    }
    
    swapImgs (){
      for(let i in this.responsiveImages){
        this.responsiveImages[i].swapSrc();
      }
    };
    
    reflow (){
      
      let images = document.querySelectorAll(this.opts.responsiveClass);
      
      for (let i=0;i<images.length;i++){
        if(this.imageIsAlreadyInArray(images[i]) === false){
          this.responsiveImages.push(new ResponsiveImg(images[i]));
        }
      }
      
      this.swapImgs();
      
      return this;
    }
    
    imageIsAlreadyInArray (image){
      let newImage = this.responsiveImages.filter(function(item, index, array){
        return item.elem == image;
      });
      
      return newImage.length > 0;
    }
    
  };
  
  const ResponsiveImg = class {
    
    constructor(img){
      const re = /([\w\d_-]*)\.?[^\\\/]*$/i;
      const bgImgRe = /(?:\(['|"]?)(.*?)(?:['|"]?\))/;
      const compStyle = img.currentStyle || window.getComputedStyle(img, false);

      this.elem = img;
      this.type = (img.nodeName === 'IMG') ? 'img' : 'div';
      this.src = img.src || bgImgRe.exec(compStyle.backgroundImage)[1];
      this.filename = this.src.match(re)[1];
      this.extension = this.src.split('.').pop();
      this.parentFolder =  this.src.substr(0, this.src.lastIndexOf('/'));
      this.currentSrc = this.src;
    }

    swapSrc(){
      
      const newSrc = this.getNewSrc();
      
      if(newSrc === this.currentSrc) return;
      
      if(this.type === 'img'){
        this.elem.src = newSrc
      }else if (this.type === 'div'){
        this.elem.style.backgroundImage = 'url(' + newSrc + ')';
      }
      this.currentSrc = newSrc;

    }

    getNewSrc(){
      
      let newSrc = '';
      let retinaSuffix = (opts.addRetinaSuffix) ? opts.retinaSuffix : '';
      let mediumSuffix = (opts.addMediumSuffix) ? opts.mediumSuffix : '';
      let largeSuffix = (opts.addLargeSuffix) ? opts.largeSuffix : '';

      // SMALL AND NOT 2X
      if (cf.isSmallBrowser(opts) && !cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + '.' + this.extension;
      }

      // MEDIUM BROWSERS AND NOT 2X
      else if (cf.isMediumBrowser(opts) && !cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + '.' + this.extension;
      }

      // LARGE AND NOT 2x
      else if (cf.isLargeBrowser(opts) && !cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + largeSuffix + '.' + this.extension;
      }
      
      // SMALL AND 2X
      else if (cf.isSmallBrowser(opts) && cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + retinaSuffix + '.' + this.extension;
      }
      // MEDIUM BROWSERS AND 2X
      else if (cf.isMediumBrowser(opts) && cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + mediumSuffix + retinaSuffix + '.' + this.extension;
      }
      // LARGE BROWSER AND IS X2
      else if (cf.isLargeBrowser(opts) && cf.isRetina(opts)){
        newSrc = this.parentFolder + '/' + this.filename + largeSuffix + retinaSuffix + '.' + this.extension;
      }


      return newSrc;
    }
    
  };
      
  return new ImgList(opts);
  
};


if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = cf;
  }
}