// ==UserScript==
// @name        Nico Menu
// @namespace   http://www.atomer.sakura.ne.jp/
// @description ニコニコ動画のヘッダーメニューの拡張
// @include     http://www.nicovideo.jp/*
// @version     0.1
// ==/UserScript==
(function() {
    var nicomenu = {
        VIDEO_RANKING: '<ul class="subNav nav4Main">' +
                           '<li><a href="http://www.nicovideo.jp/ranking/fav/hourly/all">毎時</a></li>' +
                           '<li><a href="http://www.nicovideo.jp/ranking/fav/daily/all">デイリー</a></li>' +
                           '<li><a href="http://www.nicovideo.jp/ranking/fav/weekly/all">週間</a></li>' +
                           '<li><a href="http://www.nicovideo.jp/ranking/fav/monthly/all">月間</a></li>' +
                           '<li><a href="http://www.nicovideo.jp/ranking/fav/total/all">合計</a></li>' +
                       '</ul>',
        insertRankingMenu: function() {
            var nav = document.querySelector("#mainNav");
            var li = nav.querySelector(".hasSubNav").previousSibling.previousSibling
            li.querySelector("A").appendChild(document.createTextNode("▼"));
            li.className = "hasSubNav";
            li.innerHTML = li.innerHTML + this.VIDEO_RANKING;
            li.querySelector(".subNav").style.marginLeft = "40px";
        }
    };
    
    nicomenu.insertRankingMenu();
})();