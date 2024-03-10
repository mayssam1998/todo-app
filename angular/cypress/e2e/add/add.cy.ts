import { stubApiCalls } from '../../support/stubs/commonTodoStubs';

describe('Add to do', () => {
  beforeEach(() => {
    stubApiCalls([
      { method: 'POST', url: '**/todos/add', response: '', alias: 'addTodo' },
    ]);
    cy.visit('/');
  });
  it('Adds to do to the list of todos', () => {
    cy.findAllByText('Test').should('have.length', 0);

    cy.findByPlaceholderText(/Title of note/i)
      .should('exist')
      .type('Test');

    cy.findByPlaceholderText(/Add a new note/i)
      .should('exist')
      .type('Test');
    cy.findByRole('button', { name: /Add/i }).click();
    cy.findAllByText('Test').should('have.length', 2);
    cy.get('@addTodo').its('request.body').should('deep.equal', {
      todo: 'Test',
      completed: false,
      userId: 1,
    });
  });
});
