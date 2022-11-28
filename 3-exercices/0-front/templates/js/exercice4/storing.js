export class Storing {
  saveToSessionStorage (key, value) {
    sessionStorage.setItem(key, value)
    return this
  }

  saveToLocalStorage (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
    return this
  }

  saveToCookie (key, value) {
    document.cookie = `${key}=${value};sameSite=Lax;secure;`
    return this
  }
}
