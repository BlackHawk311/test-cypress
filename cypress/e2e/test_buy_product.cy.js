describe('', function() {
    it('Purchase Product', () => {
        const baseurl = 'https://demo.evershop.io/'
        const user_email = 'john-azerty@mail.fr'
        const user_password = '12345678'
        const user_name = 'John'
        const user_phone = 12345678
        const user_address = 'John De La Calle'
        const user_city = 'Los Angeles'
        const user_postcode = 69310
        cy.login(user_email, user_password)
        cy.add_product_cart()
        cy.get('.add-cart-popup-button').should('contain', 'VIEW CART').click()
        cy.get('.shopping-cart-checkout-btn a').contains('CHECKOUT').click()
        cy.get('input[name="address[full_name]"]').type(user_name)
        cy.get('input[name="address[telephone]"]').type(user_phone)
        cy.get('input[name="address[address_1]"]').type(user_address)
        cy.get('input[name="address[city]"]').type(user_city)
        cy.get('[id="address[country]"]').select('United States')
        const addPostcode = baseurl + 'api/shippingMethods/*'
        cy.intercept('GET', addPostcode).as('addPostCode')
        cy.get('[id="address[province]"]').select('California')
        cy.wait('@addPostCode')
        cy.get('input[name="address[postcode]"]').type(user_postcode)
        cy.get('.pl-1').contains('Standard Delivery - $5.00').click()
        const addContinue = baseurl + 'api/carts/*/addresses'
        cy.intercept('POST', addContinue).as('addContinue')
        cy.get('.button span').should('contain', 'Continue to payment').click()
        cy.wait('@addContinue')
        cy.get('svg circle').first().click()
    })
})