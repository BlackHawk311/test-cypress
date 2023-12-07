// Test ajout produit panier
describe('Test Connection User', () => {
    const baseurl = 'https://demo.evershop.io/'
    it.skip('Add product to cart', () => {
        // Diriger vers la page d'accueil
        cy.visit('/')
        // Aller vers la page Men
        cy.get('.header a[href="/men"]').click()
        // Sélectionner un produit
        cy.contains('.product-name span', 'Seasonal color chuck 70').click()
        // Vérifier la redirection vers la page produit
        cy.url().should('eql', baseurl + 'men/seasonal-color-chuck-70-102')
        // Sélectionner une taille
        cy.get('li a').contains('XL').click()
        // Vérifier l'url de la page
        cy.url().should('eql', baseurl + 'men/seasonal-color-chuck-70-102?size=26')
        // Sélectionner une couleur
        cy.get('li a').contains('Black').click()
        // Vérifier l'url de la page
        cy.url().should('eql', baseurl + 'men/seasonal-color-chuck-70-102?size=26&color=14')
        // Ajouter dans le panier
        cy.get('.add-to-cart button').contains('ADD TO CART').click()
        // Vérifier l'ajout dans le panier
        cy.get('.Toastify div').contains('JUST ADDED TO YOUR CART')
        // Redirection vers la page panier
        cy.get('.add-cart-popup-button').contains('VIEW CART (1)').click()
    })
    // Utiliser intercept et wait fonction
    it('Add product to cart', () => {
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
        //cy.log(size)
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
        // Vérifier l'ajout dans le panier
        cy.get('.Toastify div').contains('JUST ADDED TO YOUR CART')
        // Redirection vers la page panier
        cy.get('.add-cart-popup-button').contains('VIEW CART (1)').click()
    })
    // Utiliser each fonction
    it.skip('$ sign present on list product', () => {})
  })