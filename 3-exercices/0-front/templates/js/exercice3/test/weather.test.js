
import { Weather } from './../weather'
import { enableFetchMocks } from 'jest-fetch-mock'

enableFetchMocks()

describe('API weather test suites', () => {
  const paris = {
    city: 'paris',
    lat: 48.52,
    long: 2.6599998
  }

  const meteo =  {
    latitude: 48.52,
    longitude: 2.6599998,
    generationtime_ms: 0.23698806762695312,
    utc_offset_seconds: 0,
    timezone: 'GMT',
    timezone_abbreviation: 'GMT',
    elevation: 57,
    current_weather: {
      temperature: 9.8,
      windspeed: 7.6,
      winddirection: 183,
      weathercode: 61,
      time: '2022-11-05T17:00'
    }
  }


  beforeEach(() => {
    fetch.resetMocks()
  })

  it('should get weather data from city longitude and latitude', () => {
    // Expected 
    fetch.mockResponse(JSON.stringify(meteo))
    // Arrange
    const weather = new Weather(paris)
    // Act
    weather.getData()
    .then((result) => {
      expect(result).toEqual(meteo)
    })
    // Assert
    expect(fetch.mock.calls.length).toEqual(1)
    expect(fetch.mock.calls[0][0]).toEqual('https://api.open-meteo.com/v1/forecast?latitude=48.52&longitude=2.6599998&current_weather=true')
  })

  it('should display weather data', () => {
    // Arrange
    document.body.innerHTML = `<header></header>`
    const weather = new Weather({city: 'Paris', lat: 1, long: 2})
    const header = document.querySelector('header')
    // Act
    weather.display(meteo, header)
    // Assert
    expect(header.outerHTML).toContain('Paris 9.8 ° C')
  })
})