Cypress.Commands.add('enviaFormularioPreenchido', () => {
  cy.get('#firstName').type('teste')
  cy.get('#lastName').type('da silva')
  cy.get('#email').type('teste@teste.com')
  cy.get('#phone').type('12345678910')
  cy.get('#open-text-area').type('cenario 2 de teste')
  cy.get('.button').click()
  
})