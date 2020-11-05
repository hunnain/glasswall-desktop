// const Utils = require('../src/ui/utils/utils');
// import * as Utils               from '../src/ui/utils/utils'


// / describe('Application launch', function () {
  //   this.timeout(10000)
  
  //   beforeEach(function () {
  //     this.app = new Application({
  //       // Your electron path can be any binary
  //       // i.e for OSX an example path could be '/Applications/MyApp.app/Contents/MacOS/MyApp'
  //       // But for the sake of the example we fetch it from our node_modules.
  //       path: electronPath,
  
  //       // Assuming you have the following directory structure
  
  //       //  |__ my project
  //       //     |__ ...
  //       //     |__ main.js
  //       //     |__ package.json
  //       //     |__ index.html
  //       //     |__ ...
  //       //     |__ test
  //       //        |__ spec.js  <- You are here! ~ Well you should be.
  
  //       // The following line tells spectron to look and use the main.js file
  //       // and the package.json located 1 level above.
  //       args: [path.join(__dirname, '../out/electron/index.js')]
  //     })
  //     return this.app.start()
  //   })
  
  //   afterEach(function () {
  //     if (this.app && this.app.isRunning()) {
  //       return this.app.stop()
  //     }
  //   })


describe('shows an initial window', function() {
    it('add', function() {
      let result = 7;
      expect(result).toBe(7);
    });
  
    // it('Check Hash Files', function() {
    //     var result = Utils.stipFileExt;
    // //   expect(result).toBe("xyzfile");
    // });
  });