
import customer from '../fixtures/customers.json';
import products from '../fixtures/products.json';
import { assertLineItems, money } from '../support/assertions';

// Test Data for adding to cart
const backpack = products.products.find(
  product => product.slug === 'sauce-labs-backpack'
);

const bikeLight = products.products.find(
  product => product.slug === 'sauce-labs-bike-light'
);

const selected = [backpack, bikeLight];

describe('Checkout', () => {
  beforeEach(() => {
    cy.loginToShop();
    cy.startCheckout(selected);
  });

  it('CHECKOUT-01 - should prevent checkout when all customer details are empty', () => {
    cy.fillCustomer({});
    cy.getByTestId('continue').click();

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'First Name is required');

    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.getByTestId('shopping-cart-badge').should('have.text', String(selected.length));
    cy.getByTestId('finish').should('not.exist');
  });

  it('CHECKOUT-02 - should prevent checkout when first name is missing', () => {
    cy.fillCustomer({
      lastName: customer.customer.lastName,
      postalCode: customer.customer.postalCode,
    });

    cy.getByTestId('continue').click();

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'First Name is required');

    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.getByTestId('shopping-cart-badge').should('have.text', String(selected.length));
    cy.getByTestId('finish').should('not.exist');
  });

  it('CHECKOUT-03 - should prevent checkout when last name is missing', () => {
    cy.fillCustomer({
      firstName: customer.customer.firstName,
      postalCode: customer.customer.postalCode,
    });

    cy.getByTestId('continue').click();

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Last Name is required');

    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.getByTestId('shopping-cart-badge').should('have.text', String(selected.length));
    cy.getByTestId('finish').should('not.exist');
  });

  it('CHECKOUT-04 - should prevent checkout when postal code is missing', () => {
    cy.fillCustomer({
      firstName: customer.customer.firstName,
      lastName: customer.customer.lastName,
    });

    cy.getByTestId('continue').click();

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Postal Code is required');

    cy.location('pathname').should('eq', '/checkout-step-one.html');
    cy.getByTestId('shopping-cart-badge').should('have.text', String(selected.length));
    cy.getByTestId('finish').should('not.exist');
  });

  it('CHECKOUT-05 - should verify order items, subtotal, tax, and total', () => {
    cy.fillCustomer();
    cy.getByTestId('continue').click();

    cy.location('pathname').should('eq', '/checkout-step-two.html');

    assertLineItems(selected);

    const subtotal = money(
      selected.reduce((sum, product) => sum + product.price, 0)
    );

    const tax = money(subtotal * customer.taxRate);
    const total = money(subtotal + tax);

    cy.getByTestId('subtotal-label')
      .should('have.text', `Item total: $${subtotal.toFixed(2)}`);

    cy.getByTestId('tax-label')
      .should('have.text', `Tax: $${tax.toFixed(2)}`);

    cy.getByTestId('total-label')
      .should('have.text', `Total: $${total.toFixed(2)}`);

    cy.getByTestId('finish').should('be.enabled');
  });

  it('CHECKOUT-06 - should complete a purchase and clear the cart', () => {
    cy.fillCustomer();
    cy.getByTestId('continue').click();
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    assertLineItems(selected);

    cy.getByTestId('finish').click();

    cy.location('pathname').should('eq', '/checkout-complete.html');

    cy.getByTestId('complete-header')
      .should('have.text', 'Thank you for your order!');

    cy.getByTestId('complete-text')
      .should('contain.text', 'Your order has been dispatched');

    cy.getByTestId('shopping-cart-badge').should('not.exist');

    cy.getByTestId('back-to-products').click();
    cy.getByTestId('title').should('have.text', 'Products');

    cy.getByTestId('shopping-cart-link').click();
    cy.getByTestId('inventory-item').should('not.exist');
  });

  it('CHECKOUT-07 - should cancel checkout information entry without losing cart items', () => {
    cy.getByTestId('cancel').click();

    cy.location('pathname').should('eq', '/cart.html');

    assertLineItems(selected);
  });

  it('CHECKOUT-08 - should cancel checkout overview without completing the order', () => {
    cy.fillCustomer();
    cy.getByTestId('continue').click();

    cy.getByTestId('cancel').click();

    cy.location('pathname').should('eq', '/inventory.html');

    cy.getByTestId('shopping-cart-badge').should('have.text', String(selected.length));

    cy.getByTestId('shopping-cart-link').click();

    assertLineItems(selected);
  });
});
