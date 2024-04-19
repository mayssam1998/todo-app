describe('delete test', () => {
  it('deletes an item', () => {
    cy.visit('/')
    cy.get("li").first().find("i").as('delete1STitem');
    cy.findAllByRole('listitem').should('have.length.at.least', 30);
    cy.get("@delete1STitem").click();
    cy.findAllByRole('listitem').should('have.length.at.least', 29);
  })
})
