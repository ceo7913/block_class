// 팝업창을 띄울 기간을 쿠키에 저장해야함
let createCookie = function(name, value, time) {
    let date = new Date();
    date.setTime(date.getTime() + time * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + "; expires" + date.toUTCString() + "; path = /";
};

let getCookie = function () {
    let value = document.cookie.match("(^|;) ?" + "jinnyCheck" + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

let isDeleteCookie = function (key) {
    document.cookie = key + "=; expires = Thu, 01 Jan 1999 00:00:10 GMT;";
};



const userName = sessionStorage.getItem("userData");

header.innerHTML = `어서오세요 ${userName} 님`
