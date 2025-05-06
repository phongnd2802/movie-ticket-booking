function setCookie(name, value, time, path = "/") {
  const maxAge = `Max-Age=${time}`;
  document.cookie = `${name}=${value}; ${maxAge}; path=${path}`;
}

function deleteCookie(name, path = "/") {
  const maxAge = `Max-Age=${0}`;
  document.cookie = name + "=; " + maxAge + "; path=" + path;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export { setCookie, getCookie, deleteCookie };
