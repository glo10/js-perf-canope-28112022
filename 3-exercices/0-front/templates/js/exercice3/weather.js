export class Weather {
  constructor (city) {
    this._city = city
  }

   async getData () {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this._city.lat}&longitude=${this._city.long}&current_weather=true`)
     return await res.json()
  }

  display (data, container) {
    const res = `${this._city.city} ${data.current_weather.temperature} ° C`
    container.insertAdjacentHTML('afterbegin', res)
  }
}
