class FormSignIn extends HTMLElement {
  constructor () {
    super()
    this.render()
    this._inputs = [
      {
        el : this.querySelector('input[type=email]'),
        msg: 'Veuillez saisir votre adresse e-mail !'
      },
      {
        el : this.querySelector('input[type=password]'),
        msg: 'Veuillez saisir votre mot de passe !'
      },
    ]

    this._submitEl = this.querySelector('input[type=submit]')
  }

  connectedCallback() {
    this.onFocusShowHelpMessage()
    this.onBlurRemoveHelpMessage()
    this.onSubmitCheckEmptyFields()
  }

  render () {
    this.innerHTML = `
    <h1>Connexion</h1>
    <form>
      <div class="my-3">
        <div class="my-2">
          <input type="email" class="form-control" name="email" placeholder="email" >
        </div>
        <div class="my-2">
          <input type="password" class="form-control" name="password" placeholder="mot de passe" >
        </div>
      </div>
      <div class="my-3">
        <input type="submit" value="Valider" class="btn btn-success me-5">
        <input type="button" value="Inscription" class="btn btn-info">
      </div>
    </form>`
  }

  onFocusShowHelpMessage () {
    const size = this._inputs.length
    for(let i = 0; i < size; i++) {
      const input = this._inputs[i]
      input.el.addEventListener('focus', () => {
        input.el.insertAdjacentHTML('beforebegin', `<p class="form-text">${input.msg}</p>`)
      })
    }
  }

  onBlurRemoveHelpMessage () {
    const size = this._inputs.length
    for(let i = 0; i < size; i++) {
      const input = this._inputs[i].el
      input.addEventListener('blur', () => {
        const p = input.parentElement.firstElementChild
        p.remove()
      })
    }
  }

  onSubmitCheckEmptyFields () {
    this._submitEl.addEventListener('click', (e) => {
      e.preventDefault()
      const alertUser = this.querySelector('.alert.alert-danger')
      const size = this._inputs.length
      for (let i = 0; i < size; i++) {
        const input = this._inputs[i]
        if (input.el.value === '') {
          if (!alertUser) {
            const p = document.createElement('p')
            p.classList.add('alert', 'alert-danger', 'my-3')
            p.textContent = 'email et/ou mot de passe obligatoires'
            this.insertAdjacentHTML('beforeend', p.outerHTML)
          }
          return
        }
      }
      if (alertUser) {
        alertUser.remove()
      }
    })
  }
}

customElements.define('form-signin', FormSignIn)
export default FormSignIn