/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    // beforeEach(() =>{
    //     // cy.reload()
    // })

    it('Voltando ao passado', () =>{
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '02/09/2021')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2020, 11, 22, 23, 50)
        cy.clock(dt.getTime(    ))
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '22/12/2020')
    })

    it('vai para o futuro', () =>{
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1630')
        cy.get('#resultado > span').invoke('text').should('gte', '1630612139053')
    })    


    it.only('Tick vai para o futuro', () => { //corigido pelo prf
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 1630701621140)
        })
    })
})   