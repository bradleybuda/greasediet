// ==UserScript==
// @name           greasediet
// @namespace      http://github.com/bradleybuda/greasediet
// @description    CSV Export from thelinediet.com
// @include        http://www.thelinediet.com/people/*
// @resource       jQuery http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

// Inject jQuery into page... gross hack... for now...
// From http://stackoverflow.com/questions/564342/jquery-ui-dialog-throw-errors-when-invoked-from-greasemonkey
(function() {
  var head = document.getElementsByTagName('head')[0];

  var script = document.createElement('script');
  script.type = 'text/javascript';

  var jQuery = GM_getResourceText('jQuery');

  script.innerHTML = jQuery;
  head.appendChild(script);

  $ = unsafeWindow.$;
})();

$(function(){
  var saveIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKYSURBVBgZBcFNiFZlGADQ87z3zjfjzDiMk5VimERmBmFpKgVRVATRQLRo5aaNhFA7pZW0qV1Ci0BoUVRQtLc2UmQaJVhBVChUhP2YDuow5sz3c7/36Zx46uipF9fNTR4oYQ82oC+QQVZdrb8tX83PY+X6kdPHF4cAAPHMG2dOf/jKnp2lxHymBiAT0tJ/Ix+dW/bvxcHqLz+dXzhzfHEAAG1pYkevbeZ/vqIpJWRlnFXXpbXR2OPb19t/T+tsXZrOeu/1x17+dMOpt58dAJSImM3MptcUbdAUmiCCIlBtnutZ3LvZtrsn17VzM+8BQEkCCkqEEqFEKBFKEy5dW3Pn7Mh9C+Hgw7doJpoXAKCFTNoGEeo4KaFt6GXx69U0rJ1ahx69a1K0pQOANpNEG0WVooTA+ycuWD/J6rCzYbbnnytrPivs2jQ7dfidH/P6ypovfvh7f5uoiKAIiaysrfY9sW+H53bPOvHtX44e2AkAPvhySa1xttSOTCoyE6kUVgcj12504OS5ywD6HSsDlpaHIqq21pzKTBIASSmhSUbj6tih3WpNiUaabhkMBlZuDrWjYfZHNade+24oI2UGlYWJoj8Yef2TP5SgG1d1XCUyk2R6omq7bmw8ZvPchAduLcbJODh7IQ3GnaZMIIWxiJA1ZVZdNzIcdtpuUGtXaw7H4ptLnRTgxurIRLQOLa7X1SEKSUY11fa8+fFFV1duakf98eWZXrPx1fuHM1mzVMCRU6kxoVrz7vcv2Ti9VSiWVv90cO9biimrg6E2Io89ffir5yPiwZQL6Eu2b52d2raJ22dveHLXPvO9LRSW+1vcNtOZ7tFGiMwEAAAPHTr59fY71j0yPzlvqp3T1ZGoVeRYjVXnL/7uysrI/62cRssvlMuuAAAAAElFTkSuQmCC";

  // add a link to export to CSV
  $('ul.UserMenu').append("<li><a class='ExportToCsv' href='#'>Export Data</a></li>");

  // stylin'
  $('.ExportToCsv')
    .css('background', 'transparent url(data:image/png;base64,' + saveIcon + ') no-repeat scroll 12px 0')
    .css('line-height', '24px')
    .css('padding-left', '40px');
    
});