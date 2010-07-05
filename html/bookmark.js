/* Add this as the url to your new bookmark

javascript:if(!document.getElementById('debug-bookmark')||document.getElementById('debug-bookmark').style.display=='none'){var%20b=document.body;if(b&&!document.xmlVersion){void(z=document.createElement('script'));void(z.type='text/javascript');void(z.src='http://ratkinson.com/bookmark.js');void(b.appendChild(z));}else{}}

*/

function gaHighlight() {
  var b = document.getElementsByTagName('body'),
      els = b[0].getElementsByTagName('*'),
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
}

function formFill() {
  var fake = {};
      fake.name = randString(4) + ' ' + randString(4);
      fake.phone = Math.round(Math.random() * 10000000000);
      fake.address = Math.round(Math.random() * 1000) + ' ' + randString(4);
      fake.city = randString(8);
      fake.state = 'NV';
      fake.zip = Math.round(Math.random() * 100000);

  fieldsets = [{'id':'newShipAdr', 'fields':[
                 {'id':'name', 'val':fake.name},
                 {'id':'phone_number', 'val':fake.phone},
                 {'id':'address', 'val':fake.address},
                 {'id':'city', 'val':fake.city},
                 {'id':'state', 'val':fake.state},
                 {'id':'postal', 'val':fake.zip}]},
               {'id':'newPymtType', 'fields':[
                 {'id':'creditCard.name', 'val':fake.name},
                 {'id':'creditCard.plainTextNumber', 'val':'4111111111111111'},
                 {'id':'creditCard.phone_number', 'val':fake.phone},
                 {'id':'creditCard.address', 'val':fake.address},
                 {'id':'creditCard.city', 'val':fake.city},
                 {'id':'creditCard.state', 'val':fake.state},
                 {'id':'creditCard.postal', 'val':fake.zip}]}
               ];

  for (var i = 0; i < fieldsets.length; i++) {
    var fs = fieldsets[i];
    if (document.getElementById(fs.id)) {
      for (var ii = 0; ii < fs.fields.length; ii++) {
        var field = fs.fields[ii];
        document.getElementById(field.id).value = field.val;
      }
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

function randSelect() {
}

function altTags() {
  var imgs = document.getElementsByTagName('IMG'),
      imgsLength = imgs.length;
  for(i = 0; i < imgsLength; i++) {
    var img = imgs[i];
    if((!img.alt) || img.alt == '') {
      img.style.outlineWidth = '3px';
      img.style.outlineStyle = 'dotted';
      img.style.outlineColor = 'orange';
    }
  }
}

(function(){
  if (document.getElementById('debug-bookmark')) {
    document.getElementById('debug-bookmark').style.display = 'block';
    return false;
  }

  var css = document.createElement('style');
  var styles = [];
  styles.push('\n');
  styles.push('#debug-bookmark {position:fixed; top:15px; right:15px; padding:15px; z-index:2147483647; font-size:14px;}\n',
              '#debug-bookmark {border:2px solid #fdfdfd; -webkit-border-radius:6px; -moz-border-radius:6px;}\n',
              '#debug-bookmark {-webkit-box-shadow:1px -1px 8px #aaa; -moz-box-shadow:3px 3px 3px #999;}\n',
              '#debug-bookmark {background:#fff;}\n',
              '#debug-bookmark a {display:block; padding:3px; font-weight:bold; text-decoration:none; color:#669;}\n',
              '#debug-bookmark a:hover {cursor:pointer; text-decoration:underline; color:#c00;}\n',
              '#debug-bookmark a:active {color:orange;}\n');

  css.innerHTML = styles.join('');
  document.getElementsByTagName('head')[0].appendChild(css);

  var menu = document.createElement('DIV');
  menu.id = 'debug-bookmark';

  var menuItems = [{'name':'gae-clicks', 'fun':gaHighlight},
                   {'name':'form fill',  'fun':formFill},
                   {'name':'alt tags',   'fun':altTags}
                  ],
      menuLength = menuItems.length;

  for (var i = 0; i < menuLength; i++) {
    var item = menuItems[i],
        link = document.createElement('A');
    link.innerHTML = item.name;
    link.onclick = item.fun;
    menu.appendChild(link);
  }

/*
  var gae = document.createElement('A');
  gae.innerHTML = 'gae-clicks';
  gae.onclick = gaHighlight;
  menu.appendChild(gae);

  var fill = document.createElement('A');
  fill.innerHTML = 'form fill';
  fill.onclick = formFill;
  menu.appendChild(fill);

  var alt = document.createElement('A');
  alt.innerHTML = 'alt tags';
  alt.onclick = altTags;
  menu.appendChild(alt);
*/

  b.appendChild(menu);

  b.onclick = function(e){
    var target = e.target;
    if (target.id && target.id == 'debug-bookmark')
      return false;
    if (target.parentNode.id && target.parentNode.id == 'debug-bookmark')
      return false;
    menu.style.display = 'none';
  }

})();
