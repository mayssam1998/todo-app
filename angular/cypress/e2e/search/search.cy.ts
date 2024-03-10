import { stubApiCalls } from '../../support/stubs/commonTodoStubs';

describe('Search functionality', () => {
  beforeEach(() => {
    stubApiCalls();
    cy.visit('/');
  });

  function populateSearchInput(query: string) {
    const searchInput = cy.findByPlaceholderText(/search todo/i);
    searchInput.type(query);
  }

  it('Updates todo list based on search field', () => {
    cy.findByText(/Showing result of/i).should('not.exist');
    cy.findByRole('button', { name: /showw all/i }).should('not.exist');
    cy.url().should('not.include', 'search=Take');
    cy.findAllByRole('listitem').should('have.length.of.at.least', 5);

    populateSearchInput('Take');
    cy.findAllByRole('listitem').should('have.length', 4);
    cy.findByText(/Showing result of/i).should('exist');
    cy.findByRole('button', { name: /show all/i }).should('exist');
    cy.url().should('include', 'search=Take');
  });

  it('Resets to initial todo list on Show all clicked', () => {
    populateSearchInput('Take');
    cy.findAllByRole('listitem').should('have.length', 4);
    cy.findByRole('button', { name: /show all/i })
      .should('exist')
      .click();
    cy.findAllByRole('listitem').should('have.length.of.at.least', 5);
    cy.findByRole('button', { name: /show all/i }).should('not.exist');
    cy.url().should('not.include', 'search=Take');
  });
  it.skip('Shows No results found on search leading to empty results');
  it.skip('Resets to initial todo list on Seach field emptied');
});
