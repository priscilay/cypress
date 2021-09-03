/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    before(() =>{
        cy.reload()
    })
    
    it('Texts', () => {
        cy.get('body').should('contain', 'Cuidado')
        // cy.get('body').should('have.text', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        // cy.get('div').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    it('Links', () => {
        // cy.get('[href="./frame.html"]').click()
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text','Voltou!')

        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text','Voltou!')

    })

    it('Textfields', () =>{
        cy.get('#formNome').type('Teste Cypress')
        cy.get('#formNome').should('have.value', 'Teste Cypress')

        cy.get('#elementosForm\\:sugestoes')
            .type('testando text area')
            .should('have.value', 'testando text area')
        
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input') 
            .type('teste ')   

        cy.get('[data-cy=dataSobrenome]')
            .type('teeste12345{backspace}{backspace}') //pq nao digitou o 45
            .should('have.value', 'teeste123')

        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', {delay:100})
            .should('have.value', 'acerto')    

    })

    it('radio', () =>{
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        
        cy.get('#formSexoMasc')  
            .should('not.be.checked')  

        cy.get('[name=formSexo]')
            .should('have.length', 2)    
    })

    it('checkbox', () =>{
        cy.get('#formComidaPizza')
            .click()
            .should('be.checked')

        cy.get('[name=formComidaFavorita]')
            .click({multiple:true})
        
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')    
    })

    it('combobox', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('Superior')
            .should('have.value', 'superior')
        
        cy.get('[data-test=dataEscolaridade]')
            .select('mestrado')
            .should('have.value', 'mestrado') 
            
            //TODO validar opcoes do combo
            cy.get('[data-test=dataEscolaridade] option')
                .should('have.length', 8)
            cy.get('[data-test=dataEscolaridade] option').then($arr =>{
                const values = []
                $arr.each(function(){
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(['Superior', 'Mestrado'])
            }) 
    })

    it.only('combo multiplo', () =>{
        cy.get('[data-testid=dataEsportes]')
            .select(['Natacao', 'Futebol'])
            //TODO validar opcoes combo multiplo
        // cy.get('[data-testid=dataEsportes]').should('have.value', ['Natacao', 'Corrida', 'nada'])
        cy.get('[data-testid=dataEsportes]').then($el =>{
            expect($el.val()).to.be.deep.equal(['natacao', 'futebol'])
            expect($el.val()).to.have.length(2)
        })
        cy.get('[data-testid=dataEsportes]')
            .invoke('val')
            .should('eql', ['natacao', 'futebol'])
    })
})


// describe('Testes hooks', () => {
    // before(() => {
     // cy.visit('https://www.wcaquino.me/cypress/frame.html')
    // })
// 
    // it('externos',() => {
// 
    // })
// 
// })