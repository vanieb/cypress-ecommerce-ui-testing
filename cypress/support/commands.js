import users from '../fixtures/users.json';
import customers from '../fixtures/customers.json';
import products from '../fixtures/products.json';

Cypress.Commands.add('getByTestId', (name) => cy.get(`[data-test="${name}"]`));
Cypress.Commands.add('login', (username = users.users.standard, password = users.users.password) => {
  cy.visit('/');
  if (username) cy.getByTestId('username').type(username, { log: false });
  if (password) cy.getByTestId('password').type(password, { log: false });
  cy.getByTestId('login-button').click();
});
Cypress.Commands.add('loginToShop', () => {
  cy.login();
  cy.location('pathname').should('eq', '/inventory.html');
  cy.getByTestId('shopping-cart-badge').should('not.exist');
});
Cypress.Commands.add('addProducts', (products) => {
  products.forEach(product => {
    cy.getByTestId(`add-to-cart-${product.slug}`).click();
    cy.getByTestId(`remove-${product.slug}`).should('be.visible');
  });
  cy.getByTestId('shopping-cart-badge').should('have.text', String(products.length));
});
Cypress.Commands.add('startCheckout', (selectedProducts = products.products.slice(0, 2)) => {
  cy.addProducts(selectedProducts);
  cy.getByTestId('shopping-cart-link').click();
  cy.getByTestId('checkout').click();
  cy.location('pathname').should('eq', '/checkout-step-one.html');
});
Cypress.Commands.add('fillCustomer', (customer = customers.customer) => {
  if (customer.firstName) cy.getByTestId('firstName').type(customer.firstName);
  if (customer.lastName) cy.getByTestId('lastName').type(customer.lastName);
  if (customer.postalCode) cy.getByTestId('postalCode').type(customer.postalCode);
});
