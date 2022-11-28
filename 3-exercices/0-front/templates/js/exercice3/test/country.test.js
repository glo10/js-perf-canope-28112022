import { enableFetchMocks } from 'jest-fetch-mock'
import { newMockXhr } from 'mock-xmlhttprequest'
import { Country } from '../country'

enableFetchMocks()
describe('Countries and cities Test suites', () => {
  const countries = ['france', 'congo', 'algérie']

  afterEach(() => {
    fetch.resetMocks()
  })

  describe('Test countries', () => {
    it('should get countries from file countries.xml', async () => {
      // Arrange
      const mockXhr = newMockXhr()
      const fileContent =
      `
      {
        "children": [{
          "children":
          [
            {
              "children": [
                {},
                {
                  "textContent": "france"
                }
              ]
            },
            {
              "children": [
                {},
                {
                  "textContent": "congo"
                }
              ]
            },
            {
              "children": [
                {},
                {
                  "textContent": "algérie"
                }
              ]
            }
          ]
        }]
      }`
      mockXhr.onSend = (request) => {
        const headers = { 'Content-Type': 'application/xml' }
        const body = JSON.parse(fileContent)
        request.respond(200, headers, body)
      }
      // Act
      try {
        global.XMLHttpRequest = mockXhr
        const api = new Country()
        const result = await api.getCountries()
        // Assert
        expect(result).toEqual(countries)
      } finally {
        delete global.XMLHttpRequest
      }
    })

    it('should get 404 not found countries', async () => {
      // Arrange
      const mockXhr = newMockXhr()
      mockXhr.onSend = (request) => {
        const headers = { 'Content-Type': 'application/xml' }
        const body = JSON.stringify(new Error('Can\'t get countries'))
        request.respond(404, headers, body)
      }

      // Act
      try {
        global.XMLHttpRequest = mockXhr
        const api = new Country()
        await expect(async () => {
          await api.getCountries()
        })
          .rejects
          .toThrowError('Can\'t get countries')
      } finally {
        delete global.XMLHttpRequest
      }
    })

    it('should replace input country by select with countries', () => {
      // Arrange
      document.body.innerHTML = `
      <input type="text" name="country" value="pays">
      `
      const api = new Country()
      // Act
      api.displayCountries(countries)
      const select = document.querySelector('select')
      const body = document.querySelector('body')
      // Assert
      expect(select).toHaveAttribute('name', 'country')
      expect(select).toBeInTheDocument()
      expect(body).toContainHTML('<option value="france">france</option>')
      expect(body).toContainHTML('<option value="congo">congo</option>')
    })
  })

  describe('Test cities', () => {
    const countriesWithCities = [{
      name: 'france',
      cities: [
        {
          name: 'paris',
          longitude: 1,
          latitude: 11
        },
        {
          name: 'lyon',
          longitude: 2,
          latitude: 22
        }
      ]
    }]

    it('should disabled city input', () => {
      // Arrange
      document.body.innerHTML = '<input>'
      const cityEl = document.querySelector('input')
      const api = new Country()
      // Act
      api.disabledField(cityEl)
      // Assert
      expect(document.querySelector('input')).toHaveAttribute('disabled', 'disabled')
    })

    it('should get cities from country', async () => {
      // Arrange
      fetch.mockResponse(JSON.stringify(countriesWithCities))
      // Act
      const api = new Country()
      const result = await api.getCities('france')
      // Assert
      expect(result).toEqual(countriesWithCities[0].cities)
    })

    it('should get 404 not found cities', async () => {
      // Arrange
      fetch.mockReject(new Error('404 not found'))
      // Act
      const api = new Country()
      const result = await api.getCities('france')
      // Assert
      expect(result).toEqual(new Error('can\'t get cities'))
      expect(fetch.mock.calls.length).toEqual(1)
      expect(fetch.mock.calls[0][0]).toEqual('../data/cities.json')
    })

    it('should replace input city by select with cities depending of country', () => {
      // Arrange
      document.body.innerHTML = '<input type="text" name="city" value="ville">'
      const api = new Country()
      // Act
      api.displayCities(countriesWithCities[0].cities)
      // Assert
      expect(document.querySelector('select')).toHaveAttribute('name', 'city')
      expect(document.querySelector('body')).toContainHTML('<option data-latitude="11" data-longitude="1" value="paris">paris</option>')
      expect(document.querySelector('body')).toContainHTML('<option data-latitude="22" data-longitude="2" value="lyon">lyon</option>')
    })
  })
})
