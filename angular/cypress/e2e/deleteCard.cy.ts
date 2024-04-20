describe("Delete Note", () => {
    it("deletes a todo card from list", () => {
        cy.visit('/')

        const card = cy.findAllByText('30');
        const deleteIcon = card.findByRole("button");
        console.log(deleteIcon);

    })
})