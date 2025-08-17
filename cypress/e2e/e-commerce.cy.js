describe('Checkout com fixture', () => {
    beforeEach(() => {
        cy.fixture('user').as('userData');
    });

    it('Finaliza compra com dados do JSON', function () {
        cy.printEtapa('login-preenchido');
        cy.login(this.userData.username, this.userData.password);
        cy.printEtapa('login-Adicionado no carrinho');
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.screenshot()
        cy.get('.shopping_cart_link').click();
        cy.screenshot()
        cy.checkout(this.userData.firstName, this.userData.lastName, this.userData.postalCode);
        cy.screenshot()
        cy.contains('Thank you for your order').should('be.visible');
    });

    afterEach(() => {
        cy.screenshot('final-do-teste');
    });

});
