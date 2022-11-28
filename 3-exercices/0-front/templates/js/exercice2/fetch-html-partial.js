export class FetchHtmlPartial {
  async fetchData (filename) {
    return fetch(filename, { headers: { 'Content-Type': 'text/plain'}})
      .then(res => res.text())
      .catch(() => new Error('404 not found'))
  }
}
