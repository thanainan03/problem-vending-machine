let productName =''
context('Aliasing', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/')
    })
  
    it('buy example', () => {
        for(let i=0 ; i< 5; i++) {
            cy.get('#ten_coin_button').click()
        }
        cy.get('#total').contains('50')
        cy.get('[data-cy=product_name_Pepsi_Max]').then(el => {
            productName = cy.log(el.text())
        })
        cy.get('[data-cy=buy_button_Pepsi_Max]').click()
        cy.get(':nth-child(2) > .swal-button').click()
        cy.get('#push_item_button').click()
        cy.get('.swal-text').contains(`Your get ${productName}`)
        cy.get('.swal-button').click()
        cy.get('#change_money_button').click()
        cy.get('.swal-text').then(text => {
            cy.log(text.text())
            expect('Your change is 10฿x3, 5฿x1, 2฿x0 and 1฿x0 ').to.equal(text.text())
        })
        cy.get('.swal-button').click()

    })
    
})