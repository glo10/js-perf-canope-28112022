import FormSignIn from './form-sign-in.js'
import userEvent from '@testing-library/user-event'

describe('Exercise 1 test suites', () => {
  const email = 'input[type=email]'
  const emailHelp = 'Veuillez saisir votre adresse e-mail !'
  const pwd = 'input[type=password]'
  const pwdHelp = 'Veuillez saisir votre mot de passe !'
  const requiredMsg = 'email et/ou mot de passe obligatoires'

  beforeEach(() => {
    const form = new FormSignIn()
    document.body.append(form)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('Testing focus event on inputs', () => {
    it(`should have the message "${emailHelp}" on focus of email field`, () => {
      // Act
      $(email).trigger('focus')
      $('body').trigger('click')
      $(email).trigger('focus')
      // Assert
      expect(document.querySelector('body')).toContainHTML(`<p class="form-text">${emailHelp}</p>`)
    })

    it(`should don't add more than one paragraph ${pwdHelp}`, () => {
     // Act
     $(pwd).trigger('focus')
     $('body').trigger('click')
     $(pwd).trigger('focus')
     // Assert
     expect(document.querySelector('body')).toContainHTML(`<p class="form-text">${pwdHelp}</p>`)
    })
  })

  describe('Testing blur event on inputs', () => {
    it(`should remove message <p>${emailHelp}</p>`, () => {
      // Act
      $(email).trigger('focus')
      $(email).trigger('blur')
      // Assert
      expect(document.querySelector('body')).not.toContainHTML(`<p class="form-text">${emailHelp}</p>`)
    })

    it(`should remove message <p>${pwdHelp}</p>`, () => {
      // Act
      $(pwd).trigger('focus')
      $(pwd).trigger('blur')
      // Assert
      expect(document.querySelector('body')).not.toContainHTML(`<p class="form-text">${pwdHelp}</p>`)
    })
  })

  describe('Testing on submit form', () => {
    it(`should show message "${requiredMsg}" when password is empty`, async () => {
      // Arrange
      const btn = document.querySelector('input[type=submit]')
      const emailEl = document.querySelector(email)
      // Act
      await userEvent.type(emailEl, 'john@google.com')
      await userEvent.click(btn)
      // Assert
      expect(document.querySelector('body')).toContainHTML(`<p class="alert alert-danger my-3">${requiredMsg}</p>`)
    })

    it(`should show message "${requiredMsg}" when email is empty`, async () => {
      // Arrange
      const btn = document.querySelector('input[type=submit]')
      const pwdEl = document.querySelector(pwd)
      // Act
      await userEvent.type(pwdEl, '123456')
      await userEvent.click(btn)
      // Assert
      expect(document.querySelector('.alert.alert-danger')).toBeInTheDocument()
    })

    it(`should not show message "${requiredMsg}" when email and password are filled`, async () => {
      // Arrange
      const btn = document.querySelector('input[type=submit]')
      await userEvent.click(btn)
      // Act
      await userEvent.type(document.querySelector(email), 'jeanne@outlook.com')
      await userEvent.type(document.querySelector(pwd), '123456')
      await userEvent.click(btn)
      // Assert
      expect(document.querySelector('.alert.alert-danger')).toBeNull()
    })
  })
})
