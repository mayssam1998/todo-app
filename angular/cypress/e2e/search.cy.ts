describe('My search test', () => {
  it('updates the todo list', () => {
    cy.intercept('GET', '**/todos',{fixture: 'todos/getTodos.json'}).as('getTodos');
    cy.visit('/')
    cy.findAllByRole('listitem').should('have.length.at.least', 10);
    const search = cy.findByPlaceholderText(/search todo/i);
    cy.findByText(/showing result of/i).should('not.exist');
    cy.findByText(/show all/i).should('not.exist');
    search.type('take');
    cy.findByText(/showing result of/i).should('exist');
    cy.findAllByRole('listitem').should('have.length.at.least', 4);
    cy.findByText(/show all/i).should('exist');
  })
})
