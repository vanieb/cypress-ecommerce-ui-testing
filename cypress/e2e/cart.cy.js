import products from '../fixtures/products.json';
import { assertLineItems } from '../support/assertions';

// Test Data for adding to cart
const backpack = products.products.find(
  product => product.slug === 'sauce-labs-backpack'
);

const bikeLight = products.products.find(
  product => product.slug === 'sauce-labs-bike-light'
);

const selected = [backpack, bikeLight];

describe('Shopping cart', () => {
  beforeEach(() => cy.loginToShop());


  it('CART-01 - should add an item with correct name, price, quantity, and count', () => {
    cy.addProducts([selected[0]]);

    cy.getByTestId('shopping-cart-link').click();
    cy.location('pathname').should('eq', '/cart.html');

    assertLineItems([selected[0]]);
    cy.getByTestId('shopping-cart-badge').should('have.text', '1');
  });

  it('CART-02 - should track multiple distinct items', () => {
    cy.addProducts(selected);
    cy.getByTestId('shopping-cart-link').click();
    cy.location('pathname').should('eq', '/cart.html');
    assertLineItems(selected);
    cy.getByTestId('shopping-cart-badge').should('have.text', '2');
  });

  it('CART-03 - should remove one item without affecting the other', () => {
    cy.addProducts(selected);
    cy.getByTestId('shopping-cart-link').click();
    cy.getByTestId(`remove-${selected[0].slug}`).click();
    assertLineItems([selected[1]]);
    cy.getByTestId('inventory-item-name').should('not.contain.text', selected[0].name);
  });

  it('CART-04 - should remove the last item and clear the badge', () => {
    cy.addProducts([selected[0]]);
    cy.getByTestId('shopping-cart-link').click();
    cy.getByTestId(`remove-${selected[0].slug}`).click();
    cy.getByTestId('inventory-item').should('not.exist');
    cy.getByTestId('shopping-cart-badge').should('not.exist');
    cy.location('pathname').should('eq', '/cart.html');
  });

  it('CART-05 - should update cart count when removing from the catalog', () => {
    cy.addProducts(selected);
    cy.getByTestId(`remove-${selected[0].slug}`).click();
    cy.getByTestId(`add-to-cart-${selected[0].slug}`).should('be.visible');
    cy.getByTestId('shopping-cart-badge').should('have.text', '1');
    cy.getByTestId('shopping-cart-link').click();
    assertLineItems([selected[1]]);
  });

  it('CART-06 - should preserve cart contents through navigation and reload', () => {
    cy.addProducts(selected);
    cy.getByTestId('shopping-cart-link').click();
    cy.getByTestId('continue-shopping').click();
    cy.location('pathname').should('eq', '/inventory.html');
    cy.reload();
    cy.getByTestId('shopping-cart-badge').should('have.text', '2');
    cy.getByTestId('shopping-cart-link').click();
    assertLineItems(selected);
  });


  it('CART-07 - should return to the product catalog when clicking Continue Shopping', () => {
    cy.addProducts([backpack]);

    cy.getByTestId('shopping-cart-link').click();
    cy.location('pathname').should('eq', '/cart.html');

    cy.getByTestId('continue-shopping').click();

    cy.location('pathname').should('eq', '/inventory.html');
    cy.getByTestId('title').should('have.text', 'Products');
    cy.getByTestId('shopping-cart-badge').should('have.text', '1');
    cy.getByTestId(`remove-${backpack.slug}`).should('be.visible');
  });

  it('CART-08 - should preserve cart contents after visiting product details', () => {
    cy.addProducts([backpack]);

    cy.getByTestId(`item-${bikeLight.id}-title-link`).click();

    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.location('search').should('eq', `?id=${bikeLight.id}`);

    cy.getByTestId('shopping-cart-badge').should('have.text', '1');

    cy.getByTestId('back-to-products').click();
    cy.location('pathname').should('eq', '/inventory.html');

    cy.getByTestId('shopping-cart-link').click();
    assertLineItems([backpack]);
    cy.getByTestId('shopping-cart-badge').should('have.text', '1');
  });

  it('CART-09 - should add a product to the cart from the product details page', () => {
    cy.getByTestId(`item-${backpack.id}-title-link`).click();

    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.location('search').should('eq', `?id=${backpack.id}`);

    cy.getByTestId('add-to-cart').click();

    cy.getByTestId('remove').should('be.visible');
    cy.getByTestId('shopping-cart-badge').should('have.text', '1');

    cy.getByTestId('shopping-cart-link').click();

    cy.location('pathname').should('eq', '/cart.html');
    assertLineItems([backpack]);
  });

  it('CART-10 - should remove a product from the product details page', () => {
    cy.addProducts([backpack]);

    cy.getByTestId(`item-${backpack.id}-title-link`).click();

    cy.location('pathname').should('eq', '/inventory-item.html');
    cy.location('search').should('eq', `?id=${backpack.id}`);

    cy.getByTestId('remove').click();

    cy.getByTestId('add-to-cart').should('be.visible');
    cy.getByTestId('shopping-cart-badge').should('not.exist');

    cy.getByTestId('shopping-cart-link').click();

    cy.location('pathname').should('eq', '/cart.html');
    cy.getByTestId('inventory-item').should('not.exist');
    cy.getByTestId('shopping-cart-badge').should('not.exist');
  });

});
