Cypress.Commands.add('preencheCamposObrigatorios', (nome, sobrenome, email) => {
    const textoLongo = Cypress._.repeat('Henrick', 10); //Repetindo uma String 10x
    cy.get('#firstName').type(nome, { delay:0 });
    cy.get('#lastName').type(sobrenome, { delay:0 });
    cy.get('#email').type(email, { delay:0 });
    cy.get('#open-text-area').type(textoLongo, { delay:0 });
})

Cypress.Commands.add('botaoObrigatorio', (checado) => {
    if (checado == 'tel') {
      cy.get('#phone-checkbox').check()
    } else {
      cy.get('#email-checkbox').check()
    }
})

Cypress.Commands.add('enviarForm', () => {
    cy.contains('.button', 'Enviar').click();
})
