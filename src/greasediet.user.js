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

