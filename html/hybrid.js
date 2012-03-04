/*
javascript: (function () { var b = document.body; if (b && !document.xmlVersion) { void(z = document.createElement('script')); void(z.type = 'text/javascript'); void(z.src = 'http://ratkinson.com/hybrid.js'); void(b.appendChild(z)); } else {} })();
*/

(function (doc) {
  var head = doc.getElementsByTagName('head')[0];
  var style = doc.createElement('style');
  var css = '.hybridActive #hybrid {display:block;}' +
            '.saveSearch,' +
            '.hybridActive #searchHeaderHeader {display:none;}';

  style.innerHTML = css;
  head.appendChild(style);
})(document);
