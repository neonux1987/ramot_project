export default function localStore() {

  const setItem = (key, value) => {
    const parsedValue = JSON.stringify(value);
    window.localStorage.setItem(key, parsedValue);
  }

  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }

  const removeItem = (key) => {
    localStorage.removeItem(key)
  }

  const clearAll = () => {
    localStorage.clear()
  }

  return { getItem, setItem, removeItem, clearAll };
}
