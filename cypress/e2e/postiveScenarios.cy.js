

describe('Testes Positivos - SauceDemo', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.loginValido();
    });

    it('Acessar a página de produtos após login', () => {
        cy.allure().severity('critical');
        cy.allure().description(`

        Dado que estou na página de login do SauceDemo\n 
        Quando inserir credenciais válidas\n 
        E clicar no botão de login\n 
        Então devo ser redirecionado para a página de produtos\n 
        E visualizar a lista de produtos disponíveis\n 
`);
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('contain', 'Products');

    });

    it('Adicionar produto ao carrinho com sucesso', () => {
        cy.allure().description(`     
       
        Dado que estou logado na aplicação\n 
        E acessandoo a página de produtos\n 
        Quando clicar no botão "Adicionar ao carrinho" de um produto\n 
        Então o ícone do carrinho deve exibir a quantidade de produtos atualizada\n 
        E o produto deve estar listado na página do carrinho\n 
`);
        cy.adicionarProdutoAoCarrinho();
        cy.get('.shopping_cart_badge').should('contain', '1');
    });

    it('Realizar o checkout com dados válidos', () => {
        cy.allure().description(`
    
        Dado que estou logado na aplicação e possuo um produto no carrinho\n 
        Quando acessar a página do carrinho\n 
        E  ele clicar em "Checkout"\n 
        E preencher os dados obrigatórios: nome, sobrenome e CEP\n 
        E clicar em "Continuar"\n 
        Então devo visualizar o resumo da compra\n 
        E ao clicar em "Finalizar", deve ser exibida a mensagem de confirmação\n 

`);
        cy.adicionarProdutoAoCarrinho();
        cy.realizarCheckout();
        cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
});
