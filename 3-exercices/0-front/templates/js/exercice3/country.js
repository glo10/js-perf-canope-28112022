export class Country {
  disabledField (el) {
    el.setAttribute('disabled', 'disabled')
  }

  async getCountries () {
    const myPromise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      // you can use xml-parse https://www.npmjs.com/package/xml-parse
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
          const countries = xhr.responseXML.children[0].children
          let names = []
          const size = countries.length
          for (let i = 0; i < size; i++) {
            const name = countries[i].children[1].textContent
            names = [...names, name]
          }
          resolve(names)
        } else if (xhr.status === 404) {
          reject(new Error('Can\'t get countries'))
        }
      }
      xhr.open('GET', '../data/countries.xml')
      xhr.send()
    })
    return myPromise
  }

  async getCities (countryName) {
    const headers = new Headers({
      'Content-Type': 'application/json'
    })
    const options = {
      method: 'GET',
      headers
    }

    const cities = await fetch('../data/cities.json', options)
      .then((res) => res.json())
      .then((data) => {
        const towns = data.filter(country => country.name.toLowerCase() === countryName.toLowerCase())
        return towns[0].cities.map((town) => { return { name: town.name, latitude: town.latitude, longitude: town.longitude } })
      })
      .catch(() => new Error('can\'t get cities'))
    return cities
  }

  displayCountries (countries) {
    const select = document.createElement('select')
    select.classList.add('form-select')
    select.setAttribute('name', 'country')
    countries.forEach(name => {
      const option = document.createElement('option')
      option.value = name
      option.textContent = name
      select.append(option)
    })
    document.querySelector('[name=country]').replaceWith(select)
  }

  displayCities (cities) {
    const select = document.createElement('select')
    select.classList.add('form-select')
    select.name = 'city'
    cities.forEach(city => {
      const option = document.createElement('option')
      option.textContent = city.name
      option.setAttribute('data-latitude', city.latitude)
      option.dataset.longitude = city.longitude
      option.value = city.name
      select.append(option)
    })
    document.querySelector('[name=city]').replaceWith(select)
  }
}
