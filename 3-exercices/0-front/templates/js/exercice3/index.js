import { Country } from './country.js'
import { Weather } from './weather.js'
window.onload = async () => {
  const { href } = location
  if(href.endsWith('/') || href.endsWith('index.html')) {
    const geo = new Country()
    const countries = await geo.getCountries()
    const input = document.querySelector('[name=country]') // type input
    if (input) {
      geo.disabledField(document.querySelector('[name=city]'))
      geo.displayCountries(countries)
      // type select
      document.querySelector('[name=country]').addEventListener('change', async (e) => {
        const cities = await geo.getCities(e.target.value)
        geo.displayCities(cities)
      })
    }
  }
  else if (href.endsWith('news.html')) {
    const paris = {
      city: 'paris',
      lat: 48.866667,
      long: 2.333333
    }
    const weather = new Weather(paris)
    weather.getData()
    .then((info) => {
      const header = document.querySelector('header')
      header.style.color = '#146c43'
      weather.display(info, header)
    })
  }
}
