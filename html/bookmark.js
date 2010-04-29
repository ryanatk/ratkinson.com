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
              '#debug-bookmark a {display:block; padding:3px; font-weight:bold; text-decoration:none; color:#666;}\n',
              '#debug-bookmark a:hover {cursor:pointer; text-decoration:underline; color:#c00;}\n',
              '#debug-bookmark a:active {color:orange;}\n');

  css.innerHTML = styles.join('');
  document.getElementsByTagName('head')[0].appendChild(css);

  var menu = document.createElement('DIV');
  menu.id = 'debug-bookmark';

  var gae = document.createElement('A');
  gae.innerHTML = 'gae-clicks';
  gae.onclick = gaHighlight;
  menu.appendChild(gae);

  var alt = document.createElement('A');
  alt.innerHTML = 'alt tags';
  alt.onclick = altTags;
  menu.appendChild(alt);

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
