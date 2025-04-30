function setCookie(name, value, time, path = "/") {
  const d = new Date();
  d.setTime(d.getTime() + time * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=${path}`;
}

async function deleteCookie(name, path) {
  const d = new Date();
  d.setTime(d.getTime() - 1);
  const expires = "expires= " + d.toUTCString();
  document.cookie = name + "=; " + expires + "; path=" + path;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export { setCookie, getCookie, deleteCookie };
