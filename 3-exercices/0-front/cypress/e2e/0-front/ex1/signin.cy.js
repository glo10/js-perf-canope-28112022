import { base, port, routes } from '../../../fixtures/parameters.json'
const home = `${base}:${port}/${routes.home}`
const email = 'input[type=email]'
const pwd = 'input[type=password]'
describe('Exercise 1 DOM test suites', () => {
  beforeEach(() => {
    cy.visit(home)
  })

  describe('handle inputs email and password focus and blur events', () => {
    it('should show email help message', () => {
      cy.get(email)
        .focus()
        .should(($input) => {
          expect($input.prev().text()).equal('Veuillez saisir votre adresse e-mail !')
        })
    })

    it('should show password help message', () => {
      cy.get(pwd)
        .focus()
        .should(($input) => {
          expect($input.prev().text()).equal('Veuillez saisir votre mot de passe !')
        })
    })

    it('should remove e-mail help message', () => {
      cy.get(email)
        .focus()
        .blur()
        .should(($el) => {
          expect($el.parent().find('.form-text')).not.to.exist
        })
    })

    it('should remove password help message', () => {
      cy.get(pwd)
        .focus()
        .blur()
        .should(($el) => {
          expect($el.parent().find('.form-text')).not.to.exist
        })
    })
  })

  describe('handle submit', () => {
    it('when password is empty', () => {
      cy.get(email).type('contact@tshimini.fr')
      cy.get('input[type=submit]')
        .click({ force: true })
        .should($i => {
          expect($i.parents('main').find('p').html()).equal('email et/ou mot de passe obligatoires')
        })
    })

    it('when email is empty', () => {
      cy.get(pwd).type('123456')
      cy.get('input[type=submit]')
        .click({ force: true })
        .should($i => {
          expect($i.parents('main').find('p').html()).equal('email et/ou mot de passe obligatoires')
        })
    })

    it('should remove required message', () => {
      cy.get('input[type=submit]').click({ force: true })
      cy.get('.alert.alert-danger').should('exist')
      cy.get(email).type('contact@tshimini.fr')
      cy.get(pwd).type('123456')
      cy.get('input[type=submit]').click({ force: true })
      cy.get('.alert.alert-danger', { timeout: 15 * 1000 }).should('not.exist')
    })
  })
})
