// ==UserScript==
// @name         NFOrce Egosearch
// @namespace    http://www.nfohump.com/
// @version      0.1
// @description  Show/Hide search results from egosearch
// @author       https://github.com/SirPumpAction
// @match        http://www.nfohump.com/forum/search.php?search_id=egosearch
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_addStyle
// @downloadURL  https://github.com/SirPumpAction/nforce_egosearch/raw/master/nforce_egosearch.user.js
// @updateURL    https://github.com/SirPumpAction/nforce_egosearch/raw/master/nforce_egosearch.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle('.rhidden { opacity:.5 }');

    if (typeof GM_getValue('tids') === 'undefined')
        GM_setValue('tids', []);

    var tids = GM_getValue('tids');

    var $hider = $('<li><a href="#">Show/Hide</a></li>');
    $hider.on('click', function(){
        $('.thidden').toggle();
        $('.rhidden').toggle();
    });

    $('#menuLeftHeader1 + .menuLeftContainer > ul').append($hider);
    $('.forumline > table > tbody > tr').not(':first').not(':last').each(function(i, tr){
        var $tr = $(tr);
        var tid = $tr.find('td:eq(2) a:first').attr('href').match(/.*t=(.*)\&.*/)[1].trim();
        var $cb = $('<input type="checkbox">');
        var $p = $('<td class="thidden">');
        $p.append($cb);
        $tr.append($p);

        if (tids.indexOf(tid) > -1) {
            $tr.addClass('rhidden');
            $cb.prop('checked', true);
        }

        $cb.on('change', function(e){
            if (e.target.checked)
                tids.push(tid);
            else
                tids.splice(tids.indexOf(tid), 1);
            $tr.toggleClass('rhidden');
            GM_setValue('tids', tids);
        });
    });
    $('.thidden').toggle();
    $('.rhidden').toggle();
})();
