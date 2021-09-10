/// <reference types="cypress" />

import loc from '../support/locators'
import '../support/commandsContas'

describe('Deve testar a nivel funcional', () => {
    before(() => {
        cy.login('priscila_franca1993@hotmail.com', '36055201')
    })

    beforeEach(() =>{
        cy.get(loc.MENU.HOME).click()
        cy.resetApp()
    })

    it('Deve inserir uma conta', () =>{
        cy.acessarMenuConta()
        cy.inserirConta('conta teste 1')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    }) 

    it('Deve alterar uma conta', () =>{
        cy.acessarMenuConta()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('conta teste alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Nao deve criar conta com mesmo nome', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Criar transacao', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('teste movimentacao')
        cy.get(loc.MOVIMENTACAO.VALOR).type('134')
        cy.get(loc.MOVIMENTACAO.ENVOLVIDO).type('mov')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
       
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('teste movimentacao', '134')).should('exist')
    })

    it('Deve pegar o saldo', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1')).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Deve remover uma movimentacao', () =>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })


})

// npm run cypress:run -- --spec cypress/integration/funcional.spec.js --headed --no-exit
// npm run cypress:run -- --spec cypress/integration/funcional.spec.js --browser chrome
//  npm run cypress:run -- --spec cypress/integration/conceitos/**/*