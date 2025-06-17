Cypress._.times(1, () => { //TC25
    it.only('testa a página da política de privacidade de forma independente', () => { // TC20
        cy.visit('src/privacy.html');
        cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible');
        cy.contains('p', 'Talking About Testing').should('be.visible');
    })
})