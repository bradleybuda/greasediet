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

/**
*
*  Base64 encode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    
    input = Base64._utf8_encode(input);
    
    while (i < input.length) {
 
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
 
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
 
      if (isNaN(chr2)) {
	enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
	enc4 = 64;
      }
 
      output = output +
	this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
	this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
      
    }
 
    return output;
  },

  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
 
    for (var n = 0; n < string.length; n++) {
 
      var c = string.charCodeAt(n);
 
      if (c < 128) {
	utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
	utftext += String.fromCharCode((c >> 6) | 192);
	utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
	utftext += String.fromCharCode((c >> 12) | 224);
	utftext += String.fromCharCode(((c >> 6) & 63) | 128);
	utftext += String.fromCharCode((c & 63) | 128);
      }
      
    }
 
    return utftext;
  }
};

// Main
$(function(){
  var saveIcon = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKYSURBVBgZBcFNiFZlGADQ87z3zjfjzDiMk5VimERmBmFpKgVRVATRQLRo5aaNhFA7pZW0qV1Ci0BoUVRQtLc2UmQaJVhBVChUhP2YDuow5sz3c7/36Zx46uipF9fNTR4oYQ82oC+QQVZdrb8tX83PY+X6kdPHF4cAAPHMG2dOf/jKnp2lxHymBiAT0tJ/Ix+dW/bvxcHqLz+dXzhzfHEAAG1pYkevbeZ/vqIpJWRlnFXXpbXR2OPb19t/T+tsXZrOeu/1x17+dMOpt58dAJSImM3MptcUbdAUmiCCIlBtnutZ3LvZtrsn17VzM+8BQEkCCkqEEqFEKBFKEy5dW3Pn7Mh9C+Hgw7doJpoXAKCFTNoGEeo4KaFt6GXx69U0rJ1ahx69a1K0pQOANpNEG0WVooTA+ycuWD/J6rCzYbbnnytrPivs2jQ7dfidH/P6ypovfvh7f5uoiKAIiaysrfY9sW+H53bPOvHtX44e2AkAPvhySa1xttSOTCoyE6kUVgcj12504OS5ywD6HSsDlpaHIqq21pzKTBIASSmhSUbj6tih3WpNiUaabhkMBlZuDrWjYfZHNade+24oI2UGlYWJoj8Yef2TP5SgG1d1XCUyk2R6omq7bmw8ZvPchAduLcbJODh7IQ3GnaZMIIWxiJA1ZVZdNzIcdtpuUGtXaw7H4ptLnRTgxurIRLQOLa7X1SEKSUY11fa8+fFFV1duakf98eWZXrPx1fuHM1mzVMCRU6kxoVrz7vcv2Ti9VSiWVv90cO9biimrg6E2Io89ffir5yPiwZQL6Eu2b52d2raJ22dveHLXPvO9LRSW+1vcNtOZ7tFGiMwEAAAPHTr59fY71j0yPzlvqp3T1ZGoVeRYjVXnL/7uysrI/62cRssvlMuuAAAAAElFTkSuQmCC";

  // add a link to export to CSV
  $('ul.UserMenu').append("<li><a class='ExportToCsv' href='#'>Export Data</a></li>");

  // stylin'
  $('.ExportToCsv')
    .css('background', 'transparent url(data:image/png;base64,' + saveIcon + ') no-repeat scroll 12px 0')
    .css('line-height', '24px')
    .css('padding-left', '40px');

  // hook up click action
  $('.ExportToCsv').click(function(){

    // create the CSV
    var csvRows = [];
    $('.Module tbody tr').each(function(){
      var date = $(this).find('td:first a').html();
      var weight = parseFloat($(this).find('td:last').html());
      csvRows.unshift('"' + date + '","' + weight + '"');
    });
    var csvRaw = csvRows.join("\n");

    // encode as a data url and fetch
    var dataUrl = 'data:text/csv;base64,' + Base64.encode(csvRaw);
    window.location = dataUrl;

    return false;
  });
});