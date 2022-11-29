import { emails, pwds, names, ages, countriesCities, all, exceptionsTypes, templateForm } from './dataprovider'
import * as _ from './../regexjq'

describe('Regex Jquery plugin', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe.each(names)('Names (first and last name) test suites', (name) => {
    it(`should ${name.result} for ${name.value}`, () => {
      document.body.innerHTML = `<input type="text" value="${name.value}">`
      expect($('input').checkName()).toBe(name.result)
    })
  })

  describe.each(ages)('Age test suites', (age) => {
    it(`should ${age.result} for ${age.value}`, () => {
      document.body.innerHTML = `<input type="number" value="${age.value}">`
      expect($('input').checkAge()).toBe(age.result)
    })
  })

  describe.each(countriesCities)('Countries and cities test suites', (c) => {
    it(`should ${c.result} for ${c.value}`, () => {
      document.body.innerHTML = `<option value="${c.value}">${c.value}</option>`
      expect($('option').checkLocation()).toBe(c.result)
    })
  })

  describe.each(emails)('Email test suites', (email) => {
    it(`should ${email.result} for ${email.value}`, () => {
      document.body.innerHTML = `<input type="email" value="${email.value}">`
      expect($('input').checkEmail()).toBe(email.result)
    })
  })

  describe.each(pwds)('Password test suites', (pwd) => {
    it(`should ${pwd.result} for ${pwd.value}`, () => {
      document.body.innerHTML = `<input type="password" value="${pwd.value}">`
      expect($('input').checkPassword()).toBe(pwd.result)
    })
  })

  describe.each(all)('check all test suites', (data) => {
    it(`should ${data.result} for ${data.value}`, () => {
      // Arrange
      document.body.innerHTML = templateForm.replaceAll('{{value}}', data.value)
      // Assert
      expect($(data.type).check()).toBe(data.result)
    })
  })

  describe.each(exceptionsTypes)('check unknow type of data', (er) => {
    it('should throw an exception for input type color', () => {
      // Arrange
      document.body.innerHTML = er.body
      // Assert
      expect(() => {
        $('div, input').check()
      }).toThrow('Can\'t check data')
    })
  })

  describe.each(all)('On keyup test suites', (data) => {
    afterEach(() => {
      document.body.innerHTML = ''
    })
    const msg = data.result ? 'not show error message wrong format' : 'show message wrong format'
    it(`should ${msg} for "${data.value}" type : "${data.type}"`, async () => {
      // Arrange
      document.body.innerHTML = templateForm.replaceAll('{{value}}', data.value)

      // Act
      $(data.type).onKeyup()
      $(data.type).trigger('keyup')
      // Assert
      const msg = document.querySelector('.alert.alert-danger')
      if (data.result) {
        expect(msg).not.toBeInTheDocument()
      } else {
        expect(msg).toBeInTheDocument()
      }
    })
  })
})
