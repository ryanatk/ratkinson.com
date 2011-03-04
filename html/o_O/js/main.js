(function () {
  $ = jQuery; 
  $(document).ready(function() {
    setupItWorks();
    setupTabs();
  });

  function setupItWorks() {
    console.log('** itWorks() **');
  }

  function setupTabs() {
    console.log('** setupTabs() **');
    var tabNav = document.getElementById('tabNav');
    var defaultTab = 'feeds';

    var urlHash = document.location.hash || defaultTab;
    showSelectedTab(urlHash);

    var selection;
    $(tabNav).click(function (e) {
      var target = e.target;
      if (target.tagName === 'A') {
        var uri = document.location.hash;
        var previous = getTabName(document.location.hash) || defaultTab;
        var previousSection = document.getElementById(previous);
        if (previousSection) previousSection.className = '';
        showSelectedTab(target.href);
      }
    });

    function getTabName(uri) {
      return uri.split('#')[1] ? uri.split('#')[1].split('?')[0] : uri.split('?')[0];
    }

    function showSelectedTab(uri) {
      var sectionId = getTabName(uri);
      var tabs = tabNav.getElementsByTagName('A');
      var len = tabs.length;
      while (len--) {
        var tab = tabs[len];
        if (tab.href == '#' + sectionId) {
          tab.className = 'selected';
        } else {
          tab.className = '';
        }
      }
      var showing = document.getElementById(sectionId) || document.getElementById(defaultTab);
      showing.className = 'selected';
    }
  }


})();
