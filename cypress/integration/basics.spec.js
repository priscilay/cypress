/// <reference types="cypress" />

describe('Cypress basics', () =>{
    it.only('Shoud visit a page and assert tittle', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)
        // cy.pause()

        cy.title().should('be.equal', 'Campo de Treinamento')
        //cy.title().debug().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('contain', 'Campo')
        
        let syncTitle
        
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        }) 

        cy.get('[data-cy=dataSobrenome]').then($el =>{
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el =>{
            cy.wrap($el).type(syncTitle)
        })

    })

    it('Interagindo com elementos', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})  




