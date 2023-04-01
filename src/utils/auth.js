const TokenKey = 'token'
// refresh token
const refReshToken = 'refreshToken';

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  return localStorage.removeItem(refReshToken);
}

export function getRefreshToken() {
  return localStorage.getItem(refReshToken)
}
export function setRefreshToken(token) {
  return localStorage.setItem(refReshToken, token)
}

//cookie
function setCookie(key, value, expirem){
  var expireDate = new Date ();
  expireDate.setTime(expireDate.getTime() + (expirem * 1000));
  document.cookie = key + "=" + value + ((expirem == null) ? "" : "; expires=" + expireDate.toUTCString());
}
function getCookie(key){
  var name = key + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return '';
}
function delCookie(key){
  if (getCookie(key)){
    setCookie(key, "", -1);
  }
}