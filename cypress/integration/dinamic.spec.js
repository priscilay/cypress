/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() =>{
        cy.reload()
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food =>{
        it(`Cadastro com comida ${food}`, () =>{
            cy.get('#formNome').type('Teste')
            cy.get('#formSobrenome').type('Teste')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            // cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
            cy.get('#formEscolaridade').select('Mestrado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado').should('contain.text', 'Cadastrado!')
      })  
    })

    it.only('deve selecionar todos usando each', () =>{
        cy.get('#formNome').type('Teste')
        cy.get('#formSobrenome').type('Teste')
        cy.get(`[name=formSexo][value=F]`).click()
        // cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
        cy.get(`[name=formComidaFavorita]`).each($el => {
            // $el.click()
            if($el.val() != 'vegetariano')
            cy.wrap($el).click()
        })


        cy.get('#formEscolaridade').select('Mestrado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain.text', 'Cadastrado!')
        // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})      
