describe("Delete Note", () => {
    it("deletes a todo card from list", () => {
        cy.visit('/')

        cy.findAllByText('30').click();
        cy.findByRole('button', {name: /Close/i}).should('exist');
    })
})