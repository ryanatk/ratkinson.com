var http = require('http'),
    request = require('request'),
    sys = require('sys'),
    jsdom = require('jsdom');

var sites = ['http://www.zappos.com',
             'http://vip.zappos.com',
             'http://www.6pm.com',
             'http://qa.zeta.zappos.com',
             'http://qae3.zeta.zappos.com',
            ];

var timestamp = new Date().getTime();
var content = '';

//for (var i=0; i < sites.length; i++) {
for (var i=0; i < 1; i++) {
  var site = sites[i];
  request({ uri:site + '/version.txt?' + timestamp }, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      console.log('Error when contacting zappos.com')
    }

    content += '<h3>' + site + '</h3>';
    content += '<p>' + body + '</p>';
  });
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(content);
}).listen(8124, "ratkinson.com");
