/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() =>{
        cy.reload()
    })

    it('Alert', () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() =>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Confirm', () =>{
        
        cy.on('window:confirm', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()

    })

    it('Deny', () =>{
        
        cy.on('window:confirm', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()

    })

    it('Prompt', () =>{
        cy.window().then(win =>{
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Era 42?')
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()

    })

    it('Desafio Validando mensagens', () => {

        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Nome eh obrigatorio')
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Sobrenome eh obrigatorio')
        })
        cy.get('#formNome').type('Priscila')
        cy.get('#formSobrenome').type('Ribeiro')
        cy.get('#formSexoFem')
        .click()
        .should('be.checked')
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain.text', 'Cadastrado!')
    })

    it.only('Solucionando desafio com prf', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Priscila')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Ribeiro')
        cy.get('#formCadastrar').click()
        .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado').should('contain.text', 'Cadastrado!')


        
    })

})   