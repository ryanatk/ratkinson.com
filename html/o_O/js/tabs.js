/* tabs.js */

tabs = function () {
  if (!(this instanceof tabs)) {
    return new tabs();
  }

  var DEFAULT_TAB = 'feeds';
  var tabNav = document.getElementById('tabNav');

  // show appropriate tab and section on page load
  showSelected(document.location.hash);

  // delegate click event to tabNav
  $(tabNav).click(function (e) {
    var target = e.target;
    if (target.tagName === 'A') {
      // hide previous section
      var previous = getTabName(document.location.hash);
      var previousSection = document.getElementById(previous) || document.getElementById(DEFAULT_TAB);
      if (previousSection) previousSection.className = '';

      // show selected section
      showSelected(target.href);
    }
  });

};

tabs.prototype = {

};
