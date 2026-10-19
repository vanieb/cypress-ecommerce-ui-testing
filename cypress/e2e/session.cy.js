
describe('Session and protected pages', () => {
  it('SESSION-01 - should log out and prevent inventory access afterward', () => {
    cy.loginToShop();

    cy.get('#react-burger-menu-btn').click();
    cy.getByTestId('logout-sidebar-link')
      .should('be.visible')
      .click();

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');

    cy.visit('/inventory.html', {
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('inventory-container').should('not.exist');
  });

  it('SESSION-02 - should prevent unauthenticated access to inventory page', () => {
    cy.visit('/inventory.html', {
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('inventory-container').should('not.exist');
  });

  it('SESSION-03 - should prevent unauthenticated access to cart page', () => {
    cy.visit('/cart.html', {
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('cart-list').should('not.exist');
  });

  it('SESSION-04 - should prevent unauthenticated access to checkout information page', () => {
    cy.visit('/checkout-step-one.html',{
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('checkout-info-container').should('not.exist');
  });

  it('SESSION-05 - should prevent unauthenticated access to checkout overview page', () => {
    cy.visit('/checkout-step-two.html', {
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('checkout-summary-container').should('not.exist');
  });

  it('SESSION-06 - should prevent unauthenticated access to checkout completion page', () => {
    cy.visit('/checkout-complete.html', {
      failOnStatusCode: false,
    });

    cy.location('pathname').should('eq', '/');
    cy.getByTestId('login-button').should('be.visible');
    cy.getByTestId('error')
      .should('contain.text', 'You can only access');
    cy.getByTestId('checkout-complete-container').should('not.exist');
  });
});
