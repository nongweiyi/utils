/**
 * 存储新cookie，设置过期时间为半小时
 */
function storeCookie(userName) {
    var date = new Date();
    date.setTime(date.getTime() + 0.5 * 3600 * 1000);
    document.cookie = "userName=" + userName + ";expires=" + date.toGMTString();
}
//更新cookie
function updateCookie() {
    storeCookie(getUserName());
}
//获取用户名
function getUserName() {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    var userName = '';
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if ("userName" === arr[0]) {
            userName = arr[1];
            return userName;
        }
    }
    return false;
}
//删除cookie,将过期时间设置为过去的时间即可
function deletCookie() {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = "userName=admin;expires=" + date.toGMTString();
}
//获取cookie
function checkLogin() {
    if (getUserName()) {
        return true;
    }
    return false;
}

export default {
    storeCookie,
    deletCookie,
    checkLogin,
    getUserName,
    updateCookie
}