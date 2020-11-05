const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')
const utils = require('./abc');

// describe('Application launch', function () {
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

//   it('shows an initial window', function () {
//     return this.app.client.getWindowCount().then(function (count) {
//       assert.equal(count, 1)
//       // Please note that getWindowCount() will return 2 if `dev tools` are opened.
//       // assert.equal(count, 2)
//     })
//   })
// })

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '../../out/electron/index.js')],
});

describe('Test Example', () => {
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

  return app.start();
});

afterEach(() => {
  if (app && app.isRunning()) {
          return app.stop()
  }
});

  it('shows an initial window', function () {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
});
});

// describe('calculate', function() {
//   it('add', function() {
//     let result = 7;
//     expect(result).toBe(7);
//   });

//   it('substract', function() {
//     let result = 2;
//     expect(result).toBe(2);
//   });
// });

// describe('Application Launch', function () {
//       var app = new Application({
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
// })