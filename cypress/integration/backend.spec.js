/// <reference types="cypress" />

describe('Deve testar a nivel API', () => {
    before(() => {
        // cy.login('priscila_franca1993@hotmail.com', '36055201')
    })

    beforeEach(() =>{
        // cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })

    it('Deve inserir uma conta', () =>{
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "priscila_franca1993@hotmail.com",
                redirecionar: false,
                senha: "36055201"
            }
        }).then(res => console.log(res))
       
    }) 

    it('Deve alterar uma conta', () =>{
       
    })

    it('Nao deve criar conta com mesmo nome', () => {
       
    })

    it('Criar transacao', () => {
    
    })

    it('Deve pegar o saldo', () => {
       
    })

    it('Deve remover uma movimentacao', () =>{
       
    })

})