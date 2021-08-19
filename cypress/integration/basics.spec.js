/// <reference types="cypress" />

describe('Cypress basics', () =>{
    it('Shoud visit a page and assert tittle', () => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
        //https://wcaquino.me/cypress/componentes.html

        // const title = cy.title()
        // console.log(title)

        cy.title()


        })

})