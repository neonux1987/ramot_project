export function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setItem(key, payload) {
  return localStorage.setItem(key, JSON.stringify(payload));
}
