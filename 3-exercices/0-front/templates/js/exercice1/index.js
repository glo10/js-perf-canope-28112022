import FormSignIn from "./form-sign-in.js"

window.onload = () => {
  const { href } = location // ie location.href
  if (href.endsWith('/') || href.endsWith('index.html')) {
    document.querySelector('main').prepend(new FormSignIn())
  }
}
