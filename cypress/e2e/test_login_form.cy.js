describe('Test connection user', () => {
  const base_url = 'https://demo.evershop.io/'

  const user_email = 'john-azerty@mail.fr'
  const user_password = '12345678'

  it('verify form', () => {
    // Dirige vers la page web
    cy.visit('/')

    // Cibler l'élément 'lien' (<a>) dans le header
    cy.get('.header a[href="/account/login"]').click()

    // Vérifier la présence des champs email et password
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('login', () => {
    // Dirige vers la page web
    cy.visit('/')

    // Cibler l'élément 'lien' (<a>) dans le header
    cy.get('.header a[href="/account/login"]').click()

    // Se connecter à un compte valide
    cy.get('input[name="email"]').type(user_email)
    cy.get('input[name="password"]').type(user_password)

    // Cliquer sur le button 'Sign in'
    cy.get('button[type="submit"]').click()
    
    // Vérifier la redirection
    cy.url().should('eql', base_url)
    cy.get('.header a[href="/account"]').click()

    // Vérifier la présence des champs email et password
    cy.get('input[name="email"]').should('not.exist')
    cy.get('input[name="password"]').should('not.exist')
    cy.get('.account-details').should('contain', user_email)

    // Revenir à la page d'accueil
    cy.visit('/')

    // Vérifier l'url
    cy.url().should('be.oneOf', ['https://demo.evershop.io', base_url])
  })

  it('logout', () => {
    // Connection au compte user
    cy.login(user_email, user_password)
    // Rediriger vers la page account
    cy.visit('/account')
    // Cliquer sur le lien 'Logout'
    cy.contains('Logout').click()
  })

  it('verify empty form', () => {
    // Dirige vers la page login
    cy.visit('/account')

    // Cliquer sur le button 'Sign in'
    cy.get('button[type="submit"]').click()
    
    // Vérifier la présence du message d'erreur
    cy.contains('This field can not be empty')
  })

  it('verify form with wrong mail', () => {
    // Dirige vers la page login
    cy.visit('/account')

    // Se connecter avec mauvais email
    cy.get('input[name="email"]').type('john-qwerty@mail.fr')
    cy.get('input[name="password"]').type(user_password)

    // Cliquer sur le button 'Sign in'
    cy.get('button[type="submit"]').click()
    
    // Vérifier la présence du message d'erreur
    cy.contains('Invalid email or password')

  })

  it('verify form with wrong password', () => {
    // Se connecter avec mauvais password
    cy.login(user_email, 'azerty')
    
    // Vérifier la présence du message d'erreur
    cy.contains('Invalid email or password')
    
  })
})

// Test with commands
describe('Test Connection User', () => {
  const user_email = 'john-azerty@mail.fr'
  const user_password = '12345678'
  it.skip('verify-form', () => {
    // Dirige vers la page web
    cy.visit('/account')

    // Vérifier la présence des champs email et password
    cy.check_form_exist()
  })
  it.skip('connection', () => {
    // Commande in commands.js
    cy.login(user_email, user_password)
  })
})