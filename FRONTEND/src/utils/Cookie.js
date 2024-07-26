import Cookies from 'js-cookie';

export const getCookie = (name) => {
  return Cookies.get(name);
}

export const setCookie = (name, data, expires) => {
  return Cookies.set(name, data, { expires });
};

export const deleteCookie = (name) => {
  Cookies.remove(name);
};

export const getToken = (name) => {
  return { headers: { 'Authorization': Cookies.get(name) } }
}

export const baseUrl = import.meta.env.VITE_BASE_URL ? `${import.meta.env.VITE_BASE_URL}/api` : "/api";