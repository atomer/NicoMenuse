// ==UserScript==
// @name        NicoMenUse
// @namespace   http://www.atomer.sakura.ne.jp/
// @description ニコニコ動画のヘッダーメニューの拡張
// @include     http://www.nicovideo.jp/*
// @version     0.1
// ==/UserScript==
(function() {
    var nicomenu = {
        VIDEO_RANKING: {
            admin: '<ul class="subNav nav4Main">' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/hourly/all">毎時</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/daily/all">デイリー</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/weekly/all">週間</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/monthly/all">月間</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/total/all">合計</a></li>' +
                   '</ul>',
            top: '<div onmouseout="hideOBJ(\'headmenu_g2\'); return false;" class="headmenu_g">' +
                     '<a href="http://www.nicovideo.jp/ranking/fav/hourly/all">毎時</a>' +
                     '<a href="http://www.nicovideo.jp/ranking/fav/daily/all">デイリー</a>' +
                     '<a href="http://www.nicovideo.jp/ranking/fav/weekly/all">週間</a>' +
                     '<a href="http://www.nicovideo.jp/ranking/fav/monthly/all">月間</a>' +
                     '<a href="http://www.nicovideo.jp/ranking/fav/total/all">合計</a>' +
                 '</div>'
        },
        
        insertRankingMenu: function() {
            var info = this._getPage();
            info && this[info.page](info.target);
        },
        
        admin: function(nav) {
            var li = nav.querySelector(".hasSubNav").previousSibling.previousSibling
            li.querySelector("A").appendChild(document.createTextNode("▼"));
            li.className = "hasSubNav";
            li.innerHTML = li.innerHTML + this.VIDEO_RANKING.admin;
            li.querySelector(".subNav").style.marginLeft = "40px";
        },
        
        top: function(nav) {
            nav.appendChild(document.createTextNode("▼"));
            var wrap = document.createElement("div");
            wrap.setAttribute("style", "position:absolute;display:none;margin-left:155px;");
            wrap.innerHTML = this.VIDEO_RANKING.top;
            nav.parentNode.insertBefore(wrap, nav.nextSibling);
            
            function open() {
                wrap.style.display = "block";
                wrap.setAttribute("data-nicohdHover", "2");
            }
            function close(s) {
                wrap.style.display = "none";
                wrap.removeAttribute("data-nicohdHover");
            }
            
            nav.addEventListener("mouseover", open, false);
            nav.addEventListener("mouseout", close, false);
            
            wrap.addEventListener("mouseover", open, false);
            wrap.addEventListener("mouseout", close, false);
        },
        
        _getPage: function() {
            var nav = document.querySelector("#mainNav");
            if (nav) {
                return {
                    page: "admin",
                    target: nav
                };
            }
            nav = document.querySelector("#menu-ranking");
            if (nav) {
                return {
                    page: "top",
                    target: nav
                };
            }
            return false;
        }
    };
    
    nicomenu.insertRankingMenu();
})();