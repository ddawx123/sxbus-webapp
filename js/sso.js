// JavaScript Document

/* 自动加载SSO */
ssoInit();
/* 加载完成 */

//Cookie Controller
/**
 * Cookie 的创建过程
 * @param string c_name cookie名
 * @param string value cookie值
 * @param string expiredays 过期时间
 * @return null
 */
function setCookie(c_name,value,expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
}
/**
 * Cookie 的读取过程
 * @param string c_name cookie名
 * @return string
 */
function getCookie(cname) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(cname + "=");
		if (c_start!=-1) {
			c_start=c_start + cname.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
/**
 * Cookie 的查验过程
 * @param string cookie_name cookie名
 * @return boolean
 */
function checkCookie(cookie_name) {
	username=getCookie(cookie_name);
	if (username!=null && username!="") {
		return true;
	}
	else {
		/*username=prompt('Please enter your name:',"");
		if (username!=null && username!="") {
			setCookie(cookie_name,username,365);
		}*/
		return false;
	}
}
function ssoInit() {
    if (!checkCookie('dingstudio_sso') && !checkCookie('dingstudio_ssotoken')) {
        location.href = 'https://passport.dingstudio.cn/sso/login?returnUrl=' + btoa(encodeURIComponent(window.location.href));
    }
}
function exitSSO() {
    if (!checkCookie('dingstudio_sso') && !checkCookie('dingstudio_ssotoken')) {
        alert('您当前没有有效的登录会话，无需执行注销操作。');
        return false;
    }
    location.href = 'https://passport.dingstudio.cn/sso/logout?url=' + encodeURIComponent(window.location.href);
}
