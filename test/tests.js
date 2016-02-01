var loc = window.location.href.slice(0, -9);

var testImgName = 'test';
var testImgExtension = 'jpg';
var testImg = 'img/test.jpg';

var mockWindow = function(width, height, retina, cf){
  
  var width = width || 600;
  var height = height || 600;
  
  window.innerWidth = width;
  window.innerHeight = height;
  
  if(cf){
    cf.isRetina = function(){return retina};
  }
  
}


QUnit.test( 'cubicflow.extend', function(assert){
  
  var cf = cubicflow.init();
 
  ok(typeof cf.imgSwap === 'function', 'cf.imgswap is a function');

});

QUnit.test( 'ImgList class', function(assert){
  

  var cf = cubicflow.init();

  var imgList = cf.imgSwap();
  ok(imgList.opts, 'imageList.Options are created');
  ok(imgList.responsiveImages, 'imageList.responsiveImages array is created');
  ok(typeof imgList.swapImgs == 'function', 'imageList.swapImgs is a function');
  ok(typeof imgList.reflow == 'function', 'imageList.reflow is a function');
  ok(typeof imgList.imageIsAlreadyInArray == 'function', 'imageList.imageIsAlreadyInArray is a function');
  
  
  var responsiveImage = imgList.responsiveImages[0];
  ok(typeof responsiveImage.swapSrc == 'function', 'ResponsiveImage.swapSrc is a function');
  ok(typeof responsiveImage.getNewSrc == 'function', 'ResponsiveImage.getNewSrc is a function');
  
});


QUnit.test( 'ResponsiveImage class', function(assert){
  
  var cf = cubicflow.init();
  var imgList = cf.imgSwap();  
  var responsiveImage = imgList.responsiveImages[0];
  var responsiveBgImage = imgList.responsiveImages[1];
  
  ok(typeof responsiveImage.swapSrc == 'function', 'ResponsiveImage.swapSrc is a function');
  ok(typeof responsiveImage.getNewSrc == 'function', 'ResponsiveImage.getNewSrc is a function');
  
  equal(typeof responsiveImage.elem, 'object', 'responsiveImg.elem is an object');
  equal(responsiveImage.type, 'img', 'responsiveImg.type is set correctly for img element');
  equal(responsiveImage.src, loc + testImg, 'responsiveImg.src is set correctly for img element');
  equal(responsiveImage.filename, testImgName, 'responsiveImg.filename is set correctly for img element');
  equal(responsiveImage.extension, testImgExtension, 'responsiveImg.extension is set correctly for img element');
  
  equal(responsiveBgImage.type, 'div', 'responsiveImg.type is set correctly for div element');
  equal(responsiveBgImage.src, loc + testImg, 'responsiveImg.src is set correctly for div element');
  equal(responsiveBgImage.filename, testImgName, 'responsiveImg.filename is set correctly for div element');
  equal(responsiveBgImage.extension, testImgExtension, 'responsiveImg.extension is set correctly for div element');
  
});

QUnit.test( 'test imgList.reflow', function(assert){
  
  var cf = cubicflow.init();
  mockWindow(500, 500, false, cf);
  
  var images = document.querySelectorAll('.cf-responsive');
  
  var responsiveImages = cf.imgSwap();
  
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on small w/ no retina');
  
  responsiveImages.reflow();
  
  equal(images[0].src, loc + 'img/test.jpg', 'existing imgs stay the same after reflow');
  
  var fixture = document.querySelector('#qunit-fixture');
  var newImgHTML = '<img src="img/test.jpg" class="cf-responsive">';
  fixture.insertAdjacentHTML('beforeend', newImgHTML);
  
  ok(responsiveImages.reflow().responsiveImages.length == 3, 'New image was added to responsiveImages array');
  images = document.querySelectorAll('.cf-responsive');
  
  equal(images[0].src, loc + 'img/test.jpg', 'existing imgs stay the same after reflow');

});


QUnit.test( 'test imgSwap with defaults', function(assert){
  
  var cf = cubicflow.init();
  var responsiveImages = cf.imgSwap();
  var images = document.querySelectorAll('.cf-responsive');
  
  
  // SMALL BROWSER WITHOUT RETINA
  mockWindow(500, 500, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on small w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test.jpg\")', 'bgImg src is correct on small w/ no retina');
  
  // SMALL BROWSER WITH RETINA
  mockWindow(500, 500, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test@2x.jpg', 'img src is correct on small @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test@2x.jpg\")', 'bgImg src is correct on small @2x');
  
  // MEDIUM BROWSER WITHOUT RETINA
  mockWindow(700, 700, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-med.jpg', 'img src is correct on medium w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-med.jpg\")', 'bgImg src is correct on medium w/ no retina');
  
  // MEDIUM BROWSER WITH RETINA
  mockWindow(700, 700, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-med@2x.jpg', 'img src is correct on medium @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-med@2x.jpg\")', 'bgImg src is correct on medium @2x');
  
  // LARGE BROWSER WITHOUT RETINA
  mockWindow(1100, 1100, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-large.jpg', 'img src is correct on large w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-large.jpg\")', 'bgImg src is correct on large w/ no retina');
  
  // LARGE BROWSER WITH RETINA
  mockWindow(1100, 1100, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-large@2x.jpg', 'img src is correct on large @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-large@2x.jpg\")', 'bgImg src is correct on large @2x');
  
});


QUnit.test( 'test imgSwap with options', function(assert){
  
  var options = {
    responsiveClass: '.cf2-responsive',
    mediumSuffix: '-m',
    addMediumSuffix: true,
    largeSuffix: '-l',
    addLargeSuffix: true,
    addRetinaSuffix: true,
    retinaSuffix: '-x2'
  };
  
  var cf = cubicflow.init();
  var responsiveImages = cf.imgSwap(options);
  var images = document.querySelectorAll('.cf2-responsive');
  
  
  // SMALL BROWSER WITHOUT RETINA
  mockWindow(500, 500, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on small w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test.jpg\")', 'bgImg src is correct on small w/ no retina');
  
  // SMALL BROWSER WITH RETINA
  mockWindow(500, 500, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-x2.jpg', 'img src is correct on small @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-x2.jpg\")', 'bgImg src is correct on small @2x');
  
  // MEDIUM BROWSER WITHOUT RETINA
  mockWindow(700, 700, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-m.jpg', 'img src is correct on medium w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-m.jpg\")', 'bgImg src is correct on medium w/ no retina');
  
  // MEDIUM BROWSER WITH RETINA
  mockWindow(700, 700, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-m-x2.jpg', 'img src is correct on medium @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-m-x2.jpg\")', 'bgImg src is correct on medium @2x');
  
  // LARGE BROWSER WITHOUT RETINA
  mockWindow(1100, 1100, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-l.jpg', 'img src is correct on large w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-l.jpg\")', 'bgImg src is correct on large w/ no retina');
  
  // LARGE BROWSER WITh RETINA
  mockWindow(1100, 1100, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test-l-x2.jpg', 'img src is correct on large @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test-l-x2.jpg\")', 'bgImg src is correct on large @2x');
  
});


QUnit.test( 'test imgSwap only @2x', function(assert){
  
  var options = {
    responsiveClass: '.cf-responsive',
    addMediumSuffix: false,
    addLargeSuffix: false,
    addRetinaSuffix: true,
  };
  
  var cf = cubicflow.init();
  var responsiveImages = cf.imgSwap(options);
  var images = document.querySelectorAll('.cf-responsive');
  
  
  // SMALL BROWSER WITHOUT RETINA
  mockWindow(500, 500, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on small w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test.jpg\")', 'bgImg src is correct on small w/ no retina');
  
  // SMALL BROWSER WITH RETINA
  mockWindow(500, 500, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test@2x.jpg', 'img src is correct on small @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test@2x.jpg\")', 'bgImg src is correct on small @2x');
  
  // MEDIUM BROWSER WITHOUT RETINA
  mockWindow(700, 700, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on medium w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test.jpg\")', 'bgImg src is correct on medium w/ no retina');
  
  // MEDIUM BROWSER WITH RETINA
  mockWindow(700, 700, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test@2x.jpg', 'img src is correct on medium @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test@2x.jpg\")', 'bgImg src is correct on medium @2x');
  
  // LARGE BROWSER WITHOUT RETINA
  mockWindow(1100, 1100, false, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test.jpg', 'img src is correct on large w/ no retina');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test.jpg\")', 'bgImg src is correct on large w/ no retina');
  
  // LARGE BROWSER WITH RETINA
  mockWindow(1100, 1100, true, cf);
  responsiveImages.reflow();
  equal(images[0].src, loc + 'img/test@2x.jpg', 'img src is correct on large @2x');
  equal(images[1].style.backgroundImage, 'url(\"' + loc + 'img/test@2x.jpg\")', 'bgImg src is correct on large @2x');
  
});





