console.log('cool');

(function(){
  console.log('beans');
  $(document).ready(function () {
    console.log('document.ready');
    getVersions('all');
  });

  function getVersions(env) {
    var ajax = $.ajax({
      url:'/versions?environment='+env,
      dataType:'text',
      error:function(){
        console.log('ajax fail');
      },
      success:function(r){
        console.log('ajax success', r);
      }
    });
  }

})();
