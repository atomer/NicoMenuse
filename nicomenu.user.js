// ==UserScript==
// @name        NicoMenUse
// @namespace   http://www.atomer.sakura.ne.jp/
// @description ニコニコ動画のヘッダーメニューの拡張
// @include     http://www.nicovideo.jp/*
// @version     0.1
// ==/UserScript==
const MENU_BUTTON_ID = "_nicomenu_menu_button";
const MENU_ID = "_nicomenu_insert_menu";
let nicomenu = {
    VIDEO_RANKING: {
        admin: '<ul id="_nicomenu_insert_menu" style="display:none;">' +
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
    
    insertRankingMenu() {
        let info = this._getPage();
        info && this[info.page](info.target);
    },
    
    admin(nav) {
        let li = nav.querySelector(".siteHeaderOther").previousSibling.previousSibling;
        li.querySelector("A").appendChild(document.createTextNode("▼"));
        li.id = MENU_BUTTON_ID;
        li.className = "siteHeaderOther";
        li.innerHTML = li.innerHTML + this.VIDEO_RANKING.admin;
        let menu = document.body.querySelector("#" + MENU_ID);
        let mouseout = e => {
            let {relatedTarget} = e;
            if (!relatedTarget) {
                return;
            }
            if (relatedTarget.id !== MENU_BUTTON_ID && relatedTarget.id !== MENU_ID &&
                relatedTarget.parentNode.id !== MENU_ID && relatedTarget.parentNode.parentNode.id !== MENU_ID) {
                menu.style.display = "none";
            }
        };
        menu.addEventListener("mouseout", mouseout);
        li.addEventListener("mouseover", () => {
            menu.style.display = "block";
        });
        li.addEventListener("mouseout", mouseout);
    },
    
    _getPage() {
        let nav = document.querySelector(".siteHeaderMenuList");
        if (nav) {
            return {
                page: "admin",
                target: nav
            };
        }
        return null;
    }
};

nicomenu.insertRankingMenu();