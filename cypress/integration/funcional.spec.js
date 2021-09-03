/// <reference types="cypress" />

describe('Deve testar a nivel funcional', () => {
    before(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.get('.input-group > .form-control').type('priscila_franca1993@hotmail.com')
        cy.get(':nth-child(2) > .form-control').type('36055201')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Bem vindo')
    })

    it('Deve inserir uma conta', () =>{
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test=nome]').type('conta teste 1')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso!')
    }) 

    it('Deve alterar uma conta', () =>{
        cy.get('[data-test=menu-settings]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//table//td[contains(.,'conta teste 1')]//..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]')
            .clear()
            .type('conta teste alterada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso!')
    })



})