// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
// Log into account
Cypress.Commands.add('login', (email, password) => {
    // Rediriger vers la page login
    cy.visit('/account/login')
    // Se connecter à un compte valide
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    // Cliquer sur le button 'Sign in'
    cy.get('button[type="submit"]').click()
})
// Check login form
Cypress.Commands.add('check_form_exist', () => {
    // Vérifier la présence des champs email et password
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
})
//
Cypress.Commands.add('add_product_cart', () => {
    const baseurl = 'https://demo.evershop.io/'
    // Diriger vers la page Men
    cy.visit('/men')
    // Sélectionner un produit
    cy.contains('.product-name span', 'Seasonal color chuck 70').click()
    // Vérifier la redirection vers la page produit
    cy.url().should('eql', baseurl + 'men/seasonal-color-chuck-70-102')
    // Intercepter l'action du clique taille
    const size = baseurl + 'men/seasonal-color-chuck-70-102?ajax=true&size=26'
    cy.intercept(size).as('addSize')
    // Sélectionner une taille
    cy.get('li a').contains('XL').click()
    // Vérifier la requête lors du clique
    cy.wait('@addSize')
    // Intercepter l'action du clique couleur
    const color = baseurl + 'men/seasonal-color-chuck-70-102?size=26&ajax=true&color=14'
    cy.intercept(color).as('addColor')
    // Sélectionner une couleur
    cy.get('li a').contains('Black').click()
    // Vérifier la requête lors du clique
    cy.wait('@addColor')
    // Intercepter l'action du clique ajout panier
    const addCart = baseurl + 'api/cart/mine/items'
    cy.intercept(addCart).as('addCart')
    // Ajouter dans le panier
    cy.get('.add-to-cart button').contains('ADD TO CART').click()
    // Vérifier la requête lors du clique
    cy.wait('@addCart')
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })