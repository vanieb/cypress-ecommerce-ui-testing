export const money = value => Number(Number(value).toFixed(2));
export const priceText = value => `$${value.toFixed(2)}`;

export function assertLineItems(products) {
  cy.getByTestId('inventory-item').should('have.length', products.length);
  products.forEach(product => {
    cy.contains('[data-test="inventory-item"]', product.name).within(() => {
      cy.getByTestId('inventory-item-name').should('have.text', product.name);
      cy.getByTestId('inventory-item-price').should('have.text', priceText(product.price));
      cy.getByTestId('item-quantity').should('have.text', '1');
    });
  });
}
