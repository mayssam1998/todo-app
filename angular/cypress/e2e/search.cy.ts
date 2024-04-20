describe("Testing Search Bar", ()=> {
        it("what it does", () => {
            cy.visit('/');
            const search = cy.findAllByPlaceholderText(/Search Todo ../i);

            cy.findByText(/Showing result of/i).should('not.exist');
            cy.findByRole('button', {name: /Show all'/i}).should('not.exist')
            cy.url().should('not.include', 'search=take');

            search.type('take')

            cy.findByText(/Showing result of/i).should('exist');
            cy.findByRole('button', {name: /Show all/i}).should('exist')
            cy.url().should('include', 'search=take');

        })
    }
)
   