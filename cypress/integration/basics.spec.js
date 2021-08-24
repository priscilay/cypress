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
            //todo imprimir o log no console
            //escrever um campo de texto
        
        cy.title().then(title => {
            console.log(title)
        }) 

    })

    it('Interagindo com elementos', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })
})  




