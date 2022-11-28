import { FetchHtmlPartial } from './fetch-html-partial.js'
import { signinElements, signupElements } from './inputs.js'

class FormSignIn extends HTMLElement {
  constructor (filename, inputs) {
    super()
    this._template = new FetchHtmlPartial()
    this._file_template = filename
    this._inputs = inputs
  }

  async connectedCallback() {
    this.innerHTML = await this.render()
    this.actions()
  }

  actions () {
    this.toggleHelpMessage()
    this.onSubmitCheckEmptyFields()
    this.toggleForm()
  }
  
  async render () {
    return this._template.fetchData(this._file_template)
  }

  toggleHelpMessage () {
    const size = this._inputs.length
    for(let i = 0; i < size; i++) {
      const input = this._inputs[i]
      const elt = this.querySelector(input.el)
      elt?.addEventListener('focus', () => {
        elt.insertAdjacentHTML('beforebegin', `<p class="form-text">${input.msg}</p>`)
      })
      elt?.addEventListener('blur', () => {
        const p = elt.parentElement.firstElementChild
        p.remove()
      })
    }
  }

  onSubmitCheckEmptyFields () {
    this.querySelector('input[type=submit]')?.addEventListener('click', (e) => {
      e.preventDefault()
      const isAlertExist = this.querySelector('.alert.alert-danger')
      const p = document.createElement('p')
      p.classList.add('alert', 'alert-danger', 'my-3')
      let isEmpty = false
      const size = this._inputs.length
      for (let i = 0; i < size; i++) {
        const input = this._inputs[i]
        const elt = this.querySelector(input.el)
        if (elt.value === '') {
          isEmpty = true
          if (!isAlertExist) {
            this.prepend(p)
          }
          this.querySelector('p').innerText = `${input.name} n'est pas remplit !`
          return
        }
      }
      if (!isEmpty && isAlertExist) {
        isAlertExist.remove()
      }
    })
  }

  toggleForm () {
    this.querySelector('input[type=button]')?.addEventListener('click', async () => {
      if (this.querySelector('h1')?.innerText?.toLowerCase() === 'inscription') {
        this.replaceWith(new FormSignIn('./../../templates/html/_partials/sign-in.html', signinElements)) 
      } else {
        this.replaceWith(new FormSignIn('./../../templates/html/_partials/sign-up.html', signupElements)) 
      }
    })
  }
}

customElements.define('form-signin', FormSignIn)
export default FormSignIn