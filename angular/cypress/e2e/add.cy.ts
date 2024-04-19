describe('add functionality test', () => {
  it('adds an item to the list', () => {

    cy.visit('/');
    cy.intercept('POST', '**/todos/add', '').as('addTodo');
    cy.findAllByAltText('test').should('have.length', 0);
    cy.findByPlaceholderText(/title of note/i).should('exist').type('test');
    cy.findByPlaceholderText(/add a new/i).should('exist').type('test');
    cy.findAllByRole('button', {name: /Add/i}).click();
    cy.findAllByText('test').should('have.length', 2);
    cy.get('@addTodo').its('request.body').should('deep.equal', {
      completed:false,
      todo:"test",
      userId:1
    })
  })
})
