var http = require('http'),
    request = require('request'),
    sys = require('sys'),
    jsdom = require('jsdom');

var sites = ['http://www.zappos.com',
             'http://vip.zappos.com',
             'http://www.6pm.com'];

var content = '';
var poop;

//for (var i=0; i < sites.length; i++) {
for (var i=0; i < 1; i++) {
  var site = sites[i];
  request({ uri:site + '/zapMeSomeInfo.do' }, function (error, response, body) {
    if (error && response.statusCode !== 200) {
      console.log('Error when contacting zappos.com')
    }

    var info = {};
    var lines = body.split('\n'),
        linesLen = lines.length;
    while (linesLen--) {
      var line = lines[linesLen];
      if (line != '' && line.indexOf(':') >= 0) {
        var cleanLine = line.replace(/<[^>]+>/g, '');
        var infos = cleanLine.split(':');
        info[infos[0]] = infos[1];
      }
    }
    console.log(info);
    poop = info['Zeta Version'];
  });
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var table = '<table><tr><td>LIVE</td><td>'+poop+'</td></tr></table>';
  res.end(table);
  //res.end(poop);
}).listen(8124, "dev.ratkinson.com");
