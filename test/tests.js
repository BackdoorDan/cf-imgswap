QUnit.test( 'cubicflow global is created', function( assert ) {
   assert.ok(window.cubicflow, 'cubicflow object is mounted on window' );
   assert.ok(typeof cubicflow.init === 'function', 'cubicflow.init is a function');
});



QUnit.test( 'cubicflow.init', function(assert){
   
   var cf = cubicflow.init();
   
   assert.ok(typeof cf === 'object', 'cubicflow.init is returning an object');

   
   var cf = cubicflow.init();
   assert.equal(cf.smallBrowser, '600', 'small browser default is set to 600');
   assert.equal(cf.medBrowser, '1025', 'med browser default is set to 1025');
   assert.equal(cf.largeBrowser, '1280', 'large browser default is set to 1280');
      
});


QUnit.test( 'cubicflow.init with passed options', function(assert){
   
   var options = {
      smallBrowserWidth: 700,
      mediumBrowserWidth: 800,
      largeBrowserWidth: 900
   };
   
   var cf = cubicflow.init(options);
   
   assert.equal(cf.smallBrowser, '700', 'small browser is set to passed value');
   assert.equal(cf.medBrowser, '800', 'med browser is set to passed value');
   assert.equal(cf.largeBrowser, '900', 'large browser is set to passed value');
      
});



QUnit.test( 'cubicflow.extend', function(assert){

   var cf = cubicflow.init();
   assert.ok(!cf.testMethod, 'testMethod doesnt exist initially');

   cf = null;

   cubicflow.extend('testMethod', function(){
      return 'working';
   });

   cf = cubicflow.init();
   assert.ok(cf.testMethod, 'testMethod exists');

   assert.equal(cf.testMethod(), 'working', 'testMethod is working correctly');

})

