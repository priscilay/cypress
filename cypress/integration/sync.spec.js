/// <reference types="cypress" />

describe('Esperas', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    before(() =>{
        cy.reload()
    })

    it('Deve aguardar elemento estar disponivel ...', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funcionaaa')

    })

    it('Deve fazer retrys ...', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')
        
    })

    it('Uso do find..', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        
        // cy.get('#lista li')
            // .find('span')
            // .should('contain', 'Item 2')    

        // cy.get('#lista li span')
            // .should('contain', 'Item 2')     
    })
    
    it('Uso do timeout...', () => {
        // cy.get('#buttonDelay').click()
        // cy.get('#novoCampo', { timeout: 1000})
            // .should('exist')
            // .type('funciona')

        cy.get('#buttonListDOM').click()
        //cy.wait(5000)
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')    
            .should('have.length', 2)    
    })

    it('click retry...', () => {
        cy.get('#buttonCount')
        .click()
        .click()
        .should('have.value', '111')
    })

    it.only('Should vs Then', () =>{
        // cy.get('#buttonListDOM').click()
        cy.get('#buttonListDOM').then($el => {
            // console.log($el)
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })//.and('eq', 2)
        //.and('not.have.id', 'buttonListDOM')
        // novas buscas dentro do blooc then, should tem retentativas, should nao troca o retorno
    })    


})   