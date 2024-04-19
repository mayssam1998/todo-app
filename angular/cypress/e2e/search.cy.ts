describe('Search functionality', () => {
  it("updates the todo list", () => {
    cy.intercept('GET','**/todos',{fixture:'todos/getTodos'}).as('getTodos');
    cy.visit("/");


    cy.findByText(/showing result of/i).should('not.exist');
    const searchInput = cy.findByPlaceholderText(/search todo/i);


    searchInput.type('make');


    cy.findByText(/showing result of/i).should('exist');
    cy.findByRole("button", {name: /show all/i}).should('exist');
  })
});
