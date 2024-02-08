///<reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('da silva')
    cy.get('#email').type('teste@teste.com')
    cy.get('#open-text-area').type('cenario 2 de teste')
    cy.contains('.button', 'Enviar').click()
    cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('exercicio extra 1', () => {
    cy.get('#open-text-area').type('alguma coisa', { delay: 0 })
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('da silva')
    cy.get('#email').type('testeteste.com')
    cy.get('#open-text-area').type('cenario 2 de teste')
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('valida que campo telefone só aceita tipo numérico', () => {
    cy.get('#phone').click().type('aqwasdzxc@#$%', { delay: 0 }).should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('da silva')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('cenario 2 de teste')
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('teste').should('have.value', 'teste').clear().should('have.value', '')
    cy.get('#lastName').type('da silva').should('have.value', 'da silva').clear().should('have.value', '')
    cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('12345678910').should('have.value', '12345678910').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizad', () => {
      cy.enviaFormularioPreenchido()
      cy.get('.success').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check('feedback').should('be.checked').and('have.value', 'feedback')
  })

  it.only('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]').each(($radio) => {
      cy.wrap($radio).check().should('be.checked')
    })
  })
})