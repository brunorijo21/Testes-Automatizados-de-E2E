const { faker } = require('@faker-js/faker');

Cypress.Commands.add('loginValido', () => {
    cy.fixture('usuario').then((usuario) => {
        cy.get('[data-test="username"]').type(usuario.username);
        cy.get('[data-test="password"]').type(usuario.password);
        cy.get('[data-test="login-button"]').click();
    });
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

Cypress.Commands.add('realizarCheckout', () => {
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();

    const nome = faker.person.firstName();
    const sobrenome = faker.person.lastName();
    const cep = faker.location.zipCode();

    cy.get('[data-test="firstName"]').type(nome);
    cy.get('[data-test="lastName"]').type(sobrenome);
    cy.get('[data-test="postalCode"]').type(cep);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add('loginInvalido', (username, password) => {
    if (username) {
        cy.get('[data-test="username"]').type(username);
    } else {
        cy.get('[data-test="username"]').focus().blur(); // simula campo tocado e deixado vazio
    }

    if (password) {
        cy.get('[data-test="password"]').type(password);
    } else {
        cy.get('[data-test="password"]').focus().blur();
    }

    cy.get('[data-test="login-button"]').click();
});

// CHECKOUT SEM CAMPOS
Cypress.Commands.add('checkoutSemCampos', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
});

// CHECKOUT SEM SOBRENOME
Cypress.Commands.add('checkoutSemSobrenome', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="continue"]').click();
});

// CHECKOUT SEM CEP
Cypress.Commands.add('checkoutSemCep', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="continue"]').click();
});
