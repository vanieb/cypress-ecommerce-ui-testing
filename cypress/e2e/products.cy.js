
import products from '../fixtures/products.json';
import { priceText } from '../support/assertions';

describe('Products', () => {
  beforeEach(() => {
    cy.loginToShop();
  });

  it('PRODUCT-01 - should display the expected product catalog', () => {
    cy.getByTestId('inventory-item')
      .should('have.length', products.products.length);

    products.products.forEach(product => {
      cy.contains('[data-test="inventory-item"]', product.name)
        .within(() => {
          cy.getByTestId('inventory-item-name')
            .should('have.text', product.name);

          cy.getByTestId('inventory-item-desc')
            .should('have.text', product.desc);

          cy.getByTestId('inventory-item-price')
            .should('have.text', priceText(product.price));

          cy.get('img')
            .should('be.visible')
            .and($img => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });

          cy.getByTestId(`add-to-cart-${product.slug}`)
            .should('be.enabled');
        });
    });
  });

  it('PRODUCT-02 - should sort products by name A to Z', () => {
    cy.getByTestId('product-sort-container').select('az');
    cy.getByTestId('product-sort-container')
      .should('have.value', 'az');

    const expected = products.products
      .map(product => product.name)
      .sort((a, b) => a.localeCompare(b));

    cy.getByTestId('inventory-item-name').should($items => {
      const actual = [...$items].map(item => item.textContent.trim());

      expect(actual).to.deep.equal(expected);
    });
  });

  it('PRODUCT-03 - should sort products by name Z to A', () => {
    cy.getByTestId('product-sort-container').select('za');
    cy.getByTestId('product-sort-container')
      .should('have.value', 'za');

    const expected = products.products
      .map(product => product.name)
      .sort((a, b) => b.localeCompare(a));

    cy.getByTestId('inventory-item-name').should($items => {
      const actual = [...$items].map(item => item.textContent.trim());

      expect(actual).to.deep.equal(expected);
    });
  });

  it('PRODUCT-04 - should sort products by price low to high', () => {
    cy.getByTestId('product-sort-container').select('lohi');
    cy.getByTestId('product-sort-container')
      .should('have.value', 'lohi');

    const expected = products.products
      .map(product => product.price)
      .sort((a, b) => a - b);

    cy.getByTestId('inventory-item-price').should($items => {
      const actual = [...$items].map(item =>
        Number(item.textContent.replace('$', '').trim())
      );

      expect(actual).to.deep.equal(expected);
    });
  });

  it('PRODUCT-05 - should sort products by price high to low', () => {
    cy.getByTestId('product-sort-container').select('hilo');
    cy.getByTestId('product-sort-container')
      .should('have.value', 'hilo');

    const expected = products.products
      .map(product => product.price)
      .sort((a, b) => b - a);

    cy.getByTestId('inventory-item-price').should($items => {
      const actual = [...$items].map(item =>
        Number(item.textContent.replace('$', '').trim())
      );

      expect(actual).to.deep.equal(expected);
    });
  });

  it('PRODUCT-06 - should display product details and return to catalog', () => {
    const product = products.products[0];

    cy.getByTestId(`item-${product.id}-title-link`).click();

    cy.location('pathname')
      .should('eq', '/inventory-item.html');

    cy.location('search')
      .should('eq', `?id=${product.id}`);

    cy.getByTestId('inventory-item-name')
      .should('have.text', product.name);

    cy.getByTestId('inventory-item-price')
      .should('have.text', priceText(product.price));

    cy.getByTestId('inventory-item-desc')
      .should('have.text', product.desc);

    cy.get('img.inventory_details_img')
      .should('be.visible')
      .and($img => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });

    cy.getByTestId('add-to-cart')
      .should('be.enabled');

    cy.getByTestId('back-to-products').click();

    cy.location('pathname')
      .should('eq', '/inventory.html');

    cy.getByTestId('title')
      .should('have.text', 'Products');
  });
});
