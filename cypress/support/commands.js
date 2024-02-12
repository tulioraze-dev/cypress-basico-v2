Cypress.Commands.add('enviaFormularioPreenchido', () => {
  cy.get('#firstName').type('teste')
  cy.get('#lastName').type('da silva')
  cy.get('#email').type('teste@teste.com')
  cy.get('#phone').type('12345678910')
  cy.get('#open-text-area').type('cenario 2 de teste')
  cy.get('.button').click()
})

Cypress.Commands.add('validaMensagens', (locator, msg) => {
  cy.get(locator).should('be.visible').and('contain', msg)
  cy.tick(3000)
  cy.get(locator).should('not.be.visible')
})
