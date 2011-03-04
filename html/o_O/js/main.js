(function () {
  var $ = jQuery;
  //var _ = function(output) {console.log(output);};

  $(document).ready(function () {
    setupTabs();
    setupMyFeeds();
  });

  function setupTabs() { //_('*** setupTabs() ***');
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

    function getTabName(uri) {
      return uri.split('#')[1] ? uri.split('#')[1].split('?')[0] : uri.split('?')[0];
    }

    function showSelected(uri) {
      var section = document.getElementById(getTabName(uri)) || document.getElementById(DEFAULT_TAB);
      var sectionId = section.id;

      // show selected section
      section.className = 'selected';

      // highlight selected tab
      var tabs = tabNav.getElementsByTagName('A'),
          len = tabs.length;
      while (len--) {
        var tab = tabs[len];
        tab.className = (getTabName(tab.href) == sectionId) ? 'selected' : '';
      }
    }
  }

  function setupMyFeeds() {
    var requestFeeds = $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      jsonpCallback: 'gas',
      cache: true,
      url: 'http://crystal.local:8080/api/o_OReport/sportId/1'
    });
  }

})();
