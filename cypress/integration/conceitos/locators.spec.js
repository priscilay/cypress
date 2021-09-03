/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() =>{
        cy.reload()
    })
    
    it('usando jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*="Francisco"]')
        cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input').type('deu certo')
        cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0)  td:eq(6) > input').type('deu certo tbm ')

    })

    it.only('usando xpath', ()=>{
        cy.xpath('//input')
    })
})