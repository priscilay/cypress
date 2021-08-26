/// <reference types="cypress" />

describe('Fixtures testes', () => {
    // before(() => {
        // cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    // })
// 
    // beforeEach(() =>{
        // cy.reload()
    // })

    it('fixture file', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        cy.fixture('userData').as('usuario').then((0 => {
            
        }))

        cy.get('#formNome').type()
        cy.get('#formSobrenome').type()
        cy.get('#formSobrenome').type()
        cy.get('[name=formSexo][value=F]').check()
        cy.get('[name=formComidaFavorita][value=pizza]').check()

    })

})    