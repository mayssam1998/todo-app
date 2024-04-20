describe("Add note", ()=> {
    it ("adds a new note to list of notes", () => {
        cy.intercept('POST', '**/todos/add', '').as('addTodo');
        cy.visit('/');

        cy.findAllByText('test').should('have.length', 0)
        const addButton = cy.findByRole('button', {name: /Add/i});
        addButton.should('exist').should('be.disabled')

        cy.findAllByPlaceholderText(/Title of note/i).type('test');
        cy.findAllByPlaceholderText(/Add a new note.../).type('test');

        addButton.click();
        cy.findAllByText('test').should('have.length', 2)
        cy.get('@addTodo').its('request.body').should('deep.equal', {
            todo: 'test',
            completed: false,
            userId: 1
        });
    })
})