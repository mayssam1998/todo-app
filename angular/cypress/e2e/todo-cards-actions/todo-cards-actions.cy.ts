import { stubApiCalls } from '../../support/stubs/commonTodoStubs';
describe('Todo cards test actions', () => {
  beforeEach(() => {
    stubApiCalls();
    cy.visit('/');
  });

  it('Delete todo list item card where mark as completed checkbox is checked', () => {
    cy.findAllByRole('listitem').should('have.length.of', 30);
    cy.findAllByRole('listitem').each(($item, index) => {
      const checkbox = $item.find('input[type="checkbox"]');
      checkbox.click();
      cy.wrap($item).should('not.exist');
    });
    cy.findAllByRole('listitem').should('have.length.of', 0);
    cy.findByText(/No todos found/i).should('exist');
  });

  it('Delete todo list item card where confirm button is clicked', () => {
    cy.findAllByRole('listitem').should('have.length.of', 30);
    cy.findAllByRole('listitem').each(($item, index) => {

      const deleteIconBtn: any = $item.find('button[data-testid="delete-icon-button"]');
      if (deleteIconBtn) deleteIconBtn.click();

      const confirmBtn: any = $item.find('button:contains("Confirm")');
      if (confirmBtn) confirmBtn.click();

      cy.wrap($item).should('not.exist');
    });
    cy.findAllByRole('listitem').should('have.length.of', 0);
    cy.findByText(/No todos found/i).should('exist');
  });
});
