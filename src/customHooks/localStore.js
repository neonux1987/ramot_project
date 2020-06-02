export default function localStore() {

  const setItem = (key, value) => {
    const parsedValue = JSON.stringify(value);
    window.localStorage.setItem(key, parsedValue);
  }

  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }

  return { getItem, setItem };
}
