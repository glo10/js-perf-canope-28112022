import { Storing } from "./storing.js"

window.onload = async () => {
  const {href} = location
  if(href.endsWith('/') || href.endsWith('index.html')) {
    const localStore = new Storing()
  }
}