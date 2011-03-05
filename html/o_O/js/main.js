(function () {
  var $ = jQuery;
  //var _ = function(output) {console.log(output);};

  $(document).ready(function () {
    setupTabs();
    //setupMyFeeds();
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
      fillSection(sectionId);

      // highlight selected tab
      var tabs = tabNav.getElementsByTagName('A'),
          len = tabs.length;
      while (len--) {
        var tab = tabs[len];
        tab.className = (getTabName(tab.href) == sectionId) ? 'selected' : '';
      }
    }
  }

  function fillSection(section) {
    if (section == 'feeds') {
      var currentFeed = document.getElementById('currentFeed');
      $(currentFeed).click(function () {
        var feedPicker = document.createElement('DIV');
        feedPicker.id = 'feedPicker';
        var buffer = [];
        buffer.push('<a href="#feeds?friend=all">My Friends</a>');
        var showFaveSports = function (r) {
          var sports = r.faveSports;
          var sportsLen = sports.length;
          for (var i=0; i < sportsLen; i++) {
            var sport = sports[i];
            buffer.push('<a href="$feeds?sport=', sport.name, '">', sport.name, '</a>');
          }
        };
        myAjaxCall('FaveSport/userId/1', showFaveSports)
      });

      var apiUrl = 'Report/userId/1/list/all';
      var myCallback = function (r) {
        var buffer = [];
        var reports = r.reports;
        var reportsLen = reports.length;
        for (var i=0; i < reportsLen; i++) {
          var report = reports[i];
          buffer.push('<li class="post">',
                        '<p class="comment">', report.comment, '</p>',
                        '<span class="author">', report.userName, '</span>',
                        'checked into <span class="sport"><a class="location" href="http://maps.google.com/">', report.sportName, '</a></span>',
                        '<time value="1996-12-19T16:39:57-08:00">', report.timestamp, '</time>.',
                      '</li>');
        }
        document.getElementById('reports').innerHTML = buffer.join('');
      };
      myAjaxCall(apiUrl, myCallback);
    }
  }

  function myAjaxCall(request, successFunction) {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      jsonpCallback: 'Po_Op',
      cache: true,
      url: 'http://crystal.local:8080/api/o_O' + request,
      error: function () { console.log('error'); },
      success: function (data) {successFunction(data);}
    });
  }

  function changeFeeds() {}

})();
