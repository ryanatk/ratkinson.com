    var jsdom = require("jsdom");
    
    jsdom.env("http://nodejs.org/dist/", [
      'http://code.jquery.com/jquery-1.5.min.js'
    ], function(errors, window) {
      console.log("there have been", window.$("a").length, "nodejs releases!");
    });
