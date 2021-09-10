/// <reference types="cypress" />

describe('Deve testar a nivel API', () => {
    
    // let token

    before(() => {
        cy.getToken('priscila_franca1993@hotmail.com', '36055201')
        // .then(tkn => {
            // token = tkn
        // })

    })

    beforeEach(() =>{
        cy.resetRest()
    })

    it('Deve inserir uma conta', () =>{
    
         cy.request({
            method:'POST',
            url: '/contas',
            // headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'conta via rest'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'conta via rest')
        })
       
    }) 

    it('Deve alterar uma conta', () =>{
        cy.getContaByName('Conta para alterar')
            .then(contaId => {
            cy.request({
                method: 'PUT',
                url: `/contas/${contaId}`,
                followRedirect: false,
                failOnStatusCode: false,
                // headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'nome novo rest'
                }
            }).as('response')

        })
         cy.get('@response').its('status').should('be.equal', 200)
    })

    it('Nao deve criar conta com mesmo nome', () => {
        cy.request({
            method: 'Post',
            url: `/contas`,
            // headers: {Authorization: `JWT ${token}`},
            failOnStatusCode: false,
            body: {
                nome: 'Conta mesmo nome'
            }
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body).to.have.property('error', 'Já existe uma conta com esse nome!')
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
       
    })

    it('Criar transacao', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                // headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment({days: 1}).add().format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "ts",
                    envolvido: "tr",
                    status: false,
                    tipo: "REC",
                    valor: "453"
                }
            }).as('response')  
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it('Deve pegar o saldo', () => {
        //valida saldo inicial
        cy.request({
            method: 'GET',
            url: '/saldo',
            // headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        //busca movimentacao ou transacao para alterar
        cy.request({
            method: 'GET',
            url: '/transacoes',
            // headers: {Authorization: `JWT ${token}`},
            qs: {
                descricao: 'Movimentacao 1, calculo saldo'
            }
        }).then(res => {
            //realiza a alteracao
            cy.request({
                method: 'PUT',
                url: `/transacoes/${res.body[0].id}`,
                // headers: {Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id

                }
            }).its('status').should('be.equal', 200)
        })

        //validando saldo apos a movimentacao
        cy.request({
            method: 'GET',
            url: '/saldo',
            // headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('Deve remover uma movimentacao', () =>{
        cy.request({
            method: 'GET',
            url: '/transacoes',
            // headers: {Authorization: `JWT ${token}`},
            qs: {
                descricao: 'Movimentacao para exclusao'
            }
        }).then(res => {
            //realiza a alteracao
            cy.request({
                method: 'DELETE',
                url: `/transacoes/${res.body[0].id}`,
                // headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
       
    })

})