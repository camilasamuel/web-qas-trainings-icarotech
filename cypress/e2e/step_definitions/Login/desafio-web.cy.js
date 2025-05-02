describe('Desafio Web - com fixture, before e comandos personalizados', () => {
  let user

  before(() => {
    cy.fixture('user').then((u) => {
      user = u
      user.email = `${user.email}+${Date.now()}@email.com` 
    })
  })

  it('Cria e deleta uma conta com sucesso', () => {
    cy.visit('http://automationexercise.com')
    cy.contains('Home').should('be.visible')
    cy.contains('Signup / Login').click()
    cy.contains('New User Signup!').should('be.visible')

    cy.get('input[data-qa="signup-name"]').type(user.name)
    cy.get('input[data-qa="signup-email"]').type(user.email)
    cy.get('button[data-qa="signup-button"]').click()

    cy.contains('Enter Account Information').should('be.visible')

    cy.preencherCadastro(user)

    cy.get('button[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
    cy.contains('Logged in as').should('be.visible')

    cy.contains('Delete Account').click()
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('a[data-qa="continue-button"]').click()
  })
})