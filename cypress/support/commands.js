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
Cypress.Commands.add('login', (email, password) => {
    // Rediriger vers la page login
    cy.visit('/account/login')

    // Se connecter à un compte valide
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)

    // Cliquer sur le button 'Sign in'
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('check_form_exist', () => {
    // Vérifier la présence des champs email et password
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
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