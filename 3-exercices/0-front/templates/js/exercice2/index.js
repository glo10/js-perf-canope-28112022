import Annoucement from './announcement.js'
import FormSignIn from './form-sign-in.js'
import { signinElements } from './inputs.js'

window.onload = () => {
  const { href } = location // ie location.href
  if (href.endsWith('news.html')) {
    const news = new Annoucement(
      './../../templates/html/_partials/article.html',
      'http://localhost:8080/https://api.factmaven.com/xml-to-json?xml=https://www.france24.com/fr/rss'
    )
    document.querySelector('.row').replaceWith(news)
  } else if (href.endsWith('/') || href.endsWith('index.html')) {
    document.querySelector('main').prepend(new FormSignIn('./../../templates/html/_partials/sign-in.html', signinElements))
  }
}
