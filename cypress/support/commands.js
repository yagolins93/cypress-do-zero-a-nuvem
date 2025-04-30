Cypress.Commands.add('fillMandatoryFieldsAndSubmit', dados => {    //Se substituir o dados(obj) por () fica comum.
    cy.get('#firstName').type(dados.firstName)
    cy.get('#lastName').type(dados.lastName)
    cy.get('#email').type(dados.email)
    cy.get('#open-text-area').type(dados.texto)
    cy.get('button[type="submit"]').click()
})