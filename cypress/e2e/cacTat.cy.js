///<reference types="cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../src/index.html')

    cy.clock()
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
    cy.validaMensagens('.success', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('da silva')
    cy.get('#email').type('testeteste.com')
    cy.get('#open-text-area').type('cenario 2 de teste')
    cy.contains('.button', 'Enviar').click()
    cy.validaMensagens('.error', 'Valide os campos obrigatórios!')
  })

  it('valida que campo telefone só aceita tipo numérico', () => {
    cy.get('#phone').click().type('aqwasdzxc@#$%', { delay: 0 }).should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('teste')
    cy.get('#lastName').type('da silva')
    cy.get('#email').type('teste@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('cenario 2 de teste')
    cy.contains('.button', 'Enviar').click()
    cy.validaMensagens('.error', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('teste').should('have.value', 'teste').clear().should('have.value', '')
    cy.get('#lastName').type('da silva').should('have.value', 'da silva').clear().should('have.value', '')
    cy.get('#email').type('teste@teste.com').should('have.value', 'teste@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('12345678910').should('have.value', '12345678910').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('.button', 'Enviar').click()
    cy.validaMensagens('.error', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizad', () => {
      cy.enviaFormularioPreenchido()
      cy.validaMensagens('.success', 'Mensagem enviada com sucesso.')
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

  it('marca cada tipo de atendimento', () => {
    cy.get('[type="radio"]').each(($radio) => {
      cy.wrap($radio).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]').first().check().should('be.checked')
    cy.get('[type="checkbox"]').last().check().should('be.checked')
    cy.get('[type="checkbox"]').last().uncheck().should('not.be.checked')
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/ROTEIRO_DE_EXTENSAO_delivery.pdf')
      .should((input) => {
        expect(input[0].files[0].name).eq('ROTEIRO_DE_EXTENSAO_delivery.pdf')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/ROTEIRO_DE_EXTENSAO_delivery.pdf', { action: 'drag-drop'})
      .should((input) => {
        expect(input[0].files[0].name).eq('ROTEIRO_DE_EXTENSAO_delivery.pdf')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("ROTEIRO_DE_EXTENSAO_delivery.pdf").as('pdf')

    cy.get('input[type="file"]').selectFile('@pdf').then((input) => {
      expect(input[0].files[0].name).eq('ROTEIRO_DE_EXTENSAO_delivery.pdf')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('[href="privacy.html"]').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('[href="privacy.html"]').invoke('removeAttr', 'target').click()

    cy.contains('Talking About Testing').should('be.visible')
  })
  
  Cypress._.times('5', () => {
    it('testa a página da política de privacidade de forma independente', () => {
      cy.visit('../src/privacy.html')
  
      cy.contains('Talking About Testing').should('be.visible')
    })
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
    cy.get('.success').should('not.be.visible')
      .invoke('show').should('be.visible').and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide').should('not.be.visible')

    cy.get('.error').should('not.be.visible')
      .invoke('show').should('be.visible').and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide').should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'teste invoke').should('have.value', 'teste invoke')
  })

})
