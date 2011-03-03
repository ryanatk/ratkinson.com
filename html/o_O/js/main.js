while (typeof $j == 'undefined') {
  console.log('eff');
}

(function () {
   $ = $j; 
   $(document).ready(function() {
     setupItWorks();
   });

   function setupItWorks() {
     console.log('it works');
   }
 })();
