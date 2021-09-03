/// <reference types="cypress" />

it('a external test', () => {

})

describe('Grupo de testes', () => {
  describe('Grupo de testes especificos', () => {
    it.skip('a internal test', () => {

    })

    it.only('a internal test', () => {

    })

  })

  it('a internal test', () => {

  })

  describe.skip('Grupo de testes especificos', () => {
    it.skip('a internal test', () => {

    })

  })

})