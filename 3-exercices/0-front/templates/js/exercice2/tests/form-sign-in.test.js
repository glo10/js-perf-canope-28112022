import FormSignIn from '../form-sign-in.js'
import userEvent from '@testing-library/user-event'
import {signinElements as inElts, signupElements as upElts} from '../inputs'
import { enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks()

describe('Exercise 1 and 2 test suites', () => {
  const email = 'input[type=email]'
  const pwd = 'input[type=password]'
  const formIn = `
  <h1>Connexion</h1>
  <div>
    <input type="email">
  </div>
  <div>
    <input type="password">
  </div>
  <div>
    <input type="submit">
    <input type="button">
  </div>
  `
  const formUp = `
  <h1>Inscription</h1>
  <div>
    <input name="l-name">
  </div>
  <div>
    <input name="f-name">
  </div>
  <div>
    <input type="email">
  </div>
  <div>
    <input type="password">
  </div>
  <div>
    <input name="confirm">
  </div>
  <div>
    <input name="age">
  </div>
  <div>
    <input name="country">
  </div>
  <div>
    <input name="city">
  </div>
  <div>
    <input type="submit">
    <input type="button">
  </div>
`

  describe.each(inElts)('Testing FOCUS and BLUR events on SIGN IN form inputs', (input) => {
    beforeEach(() => {
      fetch.mockResponse(formIn)
      const form = new FormSignIn('./../../../html/_partials/sign-in.html', inElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should have the message "${input.msg}" on focus of ${input.el} field`, () => {
      // Act
      $(input.el).trigger('focus').trigger('blur').trigger('focus')
      // Assert
      expect(document.querySelector('body')).toContainHTML(`<p class="form-text">${input.msg}</p>`)
    })

    
    it(`should not have the message "${input.msg}" on blur of ${input.el} field`, () => {
      // Act
      $(input.el).trigger('focus').trigger('blur')
      // Assert
      expect(document.querySelector('body')).not.toContainHTML(`<p class="form-text">${input.msg}</p>`)
    })
  })

  describe('Testing on SUBMIT SIGN IN form FULLYFILLED', () => {
    beforeEach(() => {
      fetch.mockResponse(formIn)
      const form = new FormSignIn('./../../../html/_partials/sign-in.html', inElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should not show message alert message when email and password are filled`, async () => {
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
  
  describe.each(inElts)('Testing on SUBMIT SIGNIN form with EMPTY FIELDS', (input) => {
    beforeEach(() => {
      fetch.mockResponse(formIn)
      const form = new FormSignIn('./../../../html/_partials/sign-in.html', inElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should show message alert message when almost one element different of ${input.el} is empty`, async () => {
      // Act
      await userEvent.type(document.querySelector(input.el), '123456')
      $('input[type=submit]').trigger('click')
      // Assert
      expect(document.querySelector('.alert.alert-danger')).toBeInTheDocument()
    })
  })

  describe.each(upElts)('Testing FOCUS and BLUR events on SIGN UP inputs form', (input) => {
    beforeEach(async () => {
      fetch.mockResponse(formUp)
      const form = new FormSignIn('./../../../html/_partials/sign-up.html', upElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  


    it(`should have the message "${input.msg}" on focus of ${input.el} field`, () => {
      // Act
      $(input.el).trigger('focus').trigger('blur').trigger('focus')
      // Assert
      expect(document.querySelector('body')).toContainHTML(`<p class="form-text">${input.msg}</p>`)
    })
       
    it(`should not have the message "${input.msg}" on blur of ${input.el} field`, () => {
      // Act
      $(input.el).trigger('focus').trigger('blur')
      // Assert
      expect(document.querySelector('body')).not.toContainHTML(`<p class="form-text">${input.msg}</p>`)
    })
  })

  describe('Testing on SUBMIT SIGN UP form FULLYFILLED', () => {
    beforeEach(() => {
      fetch.mockResponse(formUp)
      const form = new FormSignIn('./../../../html/_partials/sign-up.html', upElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should not show message alert message when all fields are filled`, async () => {
      // Arrange
      const btn = document.querySelector('input[type=submit]')
      await userEvent.click(btn)
      // Act
      await userEvent.type(document.querySelector('input[name=l-name]'), 'jean')
      await userEvent.type(document.querySelector('input[name=f-name]'), 'mouloud')
      await userEvent.type(document.querySelector(email), 'jeanne@outlook.com')
      await userEvent.type(document.querySelector(pwd), '123456')
      await userEvent.type(document.querySelector('input[name=confirm]'), '123456')
      await userEvent.type(document.querySelector('input[name=age]'), '56')
      await userEvent.type(document.querySelector('input[name=country]'), 'chine')
      await userEvent.type(document.querySelector('input[name=city]'), 'hong-kong')
      await userEvent.click(btn)
      // Assert
      expect(document.querySelector('.alert.alert-danger')).toBeNull()
    })
  })

  describe.each(upElts)('Testing on SUBMIT SIGNUP form with EMPTY FIELDS', (input) => {
    beforeEach(() => {
      fetch.mockResponse(formUp)
      const form = new FormSignIn('./../../../html/_partials/sign-up.html', upElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should show message alert message when almost one element different of ${input.el} is empty`, async () => {
      // Act
      await userEvent.type(document.querySelector(input.el), '123456')
      $('input[type=submit]').trigger('click')
      // Assert
      expect(document.querySelector('.alert.alert-danger')).toBeInTheDocument()
    })
  })

  describe('Testing SWITCH FORMS SIGNUP -> SIGNIN', () => {
    beforeEach(() => {
      fetch.mockResponse(formUp)
      const form = new FormSignIn('./../../../html/_partials/sign-up.html', upElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })  

    it(`should change form FROM SIGNUP -> SIGNIN`, () => {
      // Act
      $('input[type=button]').trigger('click')
      // Assert
      expect($('input').length).not.toEqual(10)
    })
  })

  describe('Testing SWITCH FORMS SIGNIN -> SIGNUP', () => {
    beforeEach(() => {
      fetch.mockResponse(formIn)
      const form = new FormSignIn('./../../../html/_partials/sign-in.html', inElts)
      document.body.append(form)
    })

    afterEach(() => {
      document.body.innerHTML = ''
      fetch.resetMocks()
    })

    it(`should change form FROM SIGNIN -> SIGNUP`, () => {
      // Act
      $('input[type=button]').trigger('click')
      // Assert
      expect($('input').length).not.toEqual(4)
    })
  })
})