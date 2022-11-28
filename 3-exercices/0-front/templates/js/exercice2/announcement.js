import { FetchHtmlPartial } from './fetch-html-partial.js'
class Annoucement  extends HTMLElement {
  constructor (filename, url) {
    super()
    this.filename = filename
    this.url = url
    this.fetchHtmlPartial = new FetchHtmlPartial()
  }

  async connectedCallback() {
   this.render().then(() => {
     this.openModals()
     this.closeModals()
   })
  }

  async getItems () {
    return fetch(this.url)
      .then(res => res.json())
      .then(body => body.rss.channel.item)
      .catch(() => new Error('Server error'))
  }

  replaceItem (template, data) {
    let author = '-'
    if ('source' in data && 'text' in data.source) {
      author = data.source.text
    } else if ('creator' in data) {
      author = data.creator
    }
    return template
      .replace(/{{id}}/g, data.id)
      .replace(/{{title}}/g, data.title)
      .replace(/{{thumbnail.url}}/g, data.thumbnail.url)
      .replace('{{link}}', data.link)
      .replace('{{description}}', data.description)
      .replace('{{pubDate}}', data.pubDate)
      .replace('{{author}}', author)
  }

  async render () {
    return Promise.all([this.fetchHtmlPartial.fetchData(this.filename), this.getItems()])
    .then(results => {
      const template = results[0]
      const items = results[1]
      const size = items.length
      for(let i = 0; i < size; i++) {
        const item = items[i]
        item.id = i
        this.innerHTML += this.replaceItem(template, item)
      }
    }).catch(error => console.log('error', error))
  }

  openModals () {
    const btnModals = document.querySelectorAll('[id^="modal"]')
    btnModals.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.id
        document.querySelector(`#desc-${id}`).style.display = 'block'
      })
    })
  }

  closeModals () {
    const closeBtns = document.querySelectorAll('.close')
    closeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.parentElement.closest('.modal')
        modal.style.display = 'none'
      })
    })
  }
}
customElements.define('annoucement-items', Annoucement)
export default Annoucement