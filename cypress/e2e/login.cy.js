
import users from '../fixtures/users.json';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('LOGIN-01 - should login with valid credentials', () => {
    cy.login();
    
    cy.location('pathname').should('eq', '/inventory.html');
    cy.getByTestId('title').should('have.text', 'Products');
  });

  it('LOGIN-02 - should reject an incorrect password', () => {
    cy.login(users.users.standard, 'incorrect-password');

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');

    cy.location('pathname').should('eq', '/');
  });

  it('LOGIN-03 - should reject an invalid username', () => {
    cy.login('nonexistent_qa_user', users.users.password);

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service');
  });

  it('LOGIN-04 - should require a username and password', () => {
    cy.login('', '');

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('LOGIN-05 - should require a username', () => {
    cy.login('', users.users.password);

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Username is required');
  });

  it('LOGIN-06 - should require a password', () => {
    cy.login(users.users.standard, '');

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Password is required');
  });

  it('LOGIN-07 - should reject a locked-out user', () => {
    cy.login(users.users.locked, users.users.password);

    cy.getByTestId('error')
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');

    cy.location('pathname').should('eq', '/');
  });
});

