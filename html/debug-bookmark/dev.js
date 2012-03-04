/* Add this as the url to your new bookmark

javascript:(function(){var%20el=document.getElementById('debug-bookmark');if(el){void(el.style.display='block');}else{var%20b=document.body;if(b&&!document.xmlVersion){var%20s=document.createElement('script');s.type='text/javascript';void(s.src='http://ratkinson.com/bookmark.js');b.appendChild(s);}}})();

*/

(function debugBookmark(win, doc) {
  var db = {},
      h = doc.head,
      b = doc.body,
      links = [];
console.log(db, h, b, links);

  var setup = function () {
    var divId = 'debug-bookmark',
        divPosition = 'top:0; left:0;',
        divStyles = ['#debug-bookmark {text-align:left;}',
                     'a {display:block; padding:5px 3px; text-decoration:none; color:#fff;}',
                     'a:hover {cursor:pointer; text-decoration:underline; color:#0f0;}',
                     'a:active {color:#f00;}'],
        menu = create(divId, divPosition, divStyles, menuLinks);

    menu.innerHTML = links.join('');
    b.appendChild(menu);
console.log('menu', menu);

    b.onclick = function b_onclick(e) {
      var target = e.target;
      if (target.id && target.id == 'debug-bookmark')
        return false;
      if (target.parentNode.id && target.parentNode.id == 'debug-bookmark')
        return false;
      menu.style.display = 'none';
    };
  };

  var create = function (id, position, styles) {
  // create fixed pos div. used by menu and other messages
    if (document.getElementById(id)) {
      document.getElementById(id).style.display = 'block';
      return false;
    }

    var stylesheet = document.createElement('style'),
        css = [];
    css.push('\n',
                '#',id,' {position:fixed; ', position,' padding:15px; z-index:2147483647; font-size:14px;}\n',
                '#',id,' {background:rgba(0,0,0,.85);}\n');

    var len = styles.length;
    for (var i = 0; i < len; i++) {
      css.push('#',id,' ',styles[i],'\n');
    }

    stylesheet.innerHTML = css.join('');
    document.getElementsByTagName('head')[0].appendChild(stylesheet);

    var newDiv = document.createElement('DIV');
    newDiv.id = id;
    return newDiv;

  };

  setup();

/*
  // find and outline elements with gae-click class in red
  links.push('<a onclick="ga();">GAe Clicks</a>');
  var ga = function () {
    var b = document.body,
        els = b.getElementsByTagName('*'),
        elsLength = els.length;
    for(i = 0; i < elsLength; i++) {
      var el = els[i];
      if((el.className) && (el.className.match(/gae-click/))) {
        el.style.outlineWidth = '3px';
        el.style.outlineStyle = 'dotted';
        el.style.outlineColor = 'red';
        var ga = el.className.match(/gae-click\*([^*]+)\*([^*]+)\*([^ ]+)/);
        el.title = ga[1] + ' > ' + ga[2] + ' > ' + ga[3];
      }
    }
  };

  // auto fills forms
  links.push('<a onclick="forms();">Form Fill</a>');
  var forms = function () {
    var fake = {};
        fake.name = randString(4) + ' ' + randString(4);
        fake.phoneNumber = Math.round(Math.random() * 10000000000);
        fake.address1 = Math.round(Math.random() * 1000) + ' ' + randString(4);
        fake.city = randString(8);
        fake.state = 'NV';
        fake.postalCode = 89074,
        fake.plainTextNumber = '4111111111111111',
        fake.email = randString(6) + '@' + randString(5) + '.com';
        fake.emailConfirm = fake.email;
        fake.expirationYear = 2014;

    if (document.getElementById('content')) {
      var fs = document.getElementById('content'),
          inputs = fs.getElementsByTagName('input'),
          selects = fs.getElementsByTagName('select');
      applyValue(inputs);
      applyValue(selects);
    }

    function applyValue(fields) {
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i],
            idParts = field.id ? field.id.split('.') : ['noId'],
            id = idParts[idParts.length - 1];
        if (fake[id]) {
          field.value = fake[id];
        }
      }
    }

    function randString(len) {
      var randy = [];
      for (var i = 0; i < len; i++) {
        randy.push(String.fromCharCode(97 + Math.round(Math.random() * 25)));
      }
      return randy.join('');
    }
  };

  // find and outline hotspots in orange
  links.push('<a onclick="hotspots();">Find Hotspots</a>');
  var hotspots = function () {
    var imgs = document.getElementsByTagName('IMG'),
        imgsLength = imgs.length;
    for(i = 0; i < imgsLength; i++) {
      var img = imgs[i];
      if((img.className) && (img.className.match(/hotspot/))) {
        img.style.outlineWidth = '3px';
        img.style.outlineStyle = 'dotted';
        img.style.outlineColor = 'orange';
      }
    }
  };

  // is this page drupal?
  links.push('<a onclick="drupal();">Is it Drupal?</a>');
  var drupal = function () {
    var b = document.body,
        imgs = document.getElementsByTagName('IMG'),
        imgsLength = imgs.length,
        msg = 'Nope, it\'s not Drupal',
        divId = 'isItDrupal',
        divPosition = {'top':'15px', 'left':'625px'},
        divStyles = ['{max-width:160px;}'],
        banner = createFixedDiv(divId, divPosition, divStyles);
    for(i = 0; i < imgsLength; i++) {
      var img = imgs[i];
      if((img.src) && (img.src.match(/\/sites\//))) {
        msg = 'Yep, it\'s Drupal';
        break;
      }
    }

    banner.innerHTML = msg;
    b.appendChild(banner);
  };

  // which zapi am i using?
  links.push('<a onclick="zapi();">Which zapi?</a>');
  var zapi = function () {
    var b = document.body,
        divId = 'whichZapi',
        divPosition = {'top':'15px', 'left':'15px'},
        divStyles = ['{max-width:350px;}'];
        banner = createFixedDiv(divId, divPosition, divStyles),
        msg = 'sorry, but i don\'t know which zapi',
        xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange=function xmlorsc() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        var zMsg = xmlhttp.responseText.split('\n\n');
        msg = [zMsg[0], zMsg[1], zMsg[2], zMsg[3]].join('\n\n');
      }
      banner.innerHTML = msg;
      b.appendChild(banner);
    }
    xmlhttp.open("GET","/zapMeSomeInfo.do",true);
    xmlhttp.send();
  };
*/

})(window, document);

