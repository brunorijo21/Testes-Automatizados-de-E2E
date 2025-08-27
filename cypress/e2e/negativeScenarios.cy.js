describe('Testes Negativos - SauceDemo', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Não logar com usuário inválido', () => {
        cy.allure().description(`

        Dado que estou na página de login\n 
        Quando preencho o campo de usuário com "usuario_invalido"\n 
        E preencho o campo de senha com "senha_errada"\n 
        E clico no botão de login\n 
        Então devo visualizar uma mensagem de erro "Usuário ou senha inválidos"\n 
`);

        cy.loginInvalido('usuario_invalido', 'secret_sauce');
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });

    it('Não logar com senha inválida', () => {
        cy.allure().description(`
        
        Dado que estou na página de login\n
        Quando preencho o campo de usuário com "usuario_valido"\n
        E preencho o campo de senha com "senha_incorreta"\n
        E clico no botão de login\n
        Então devo visualizar uma mensagem de erro "Usuário ou senha inválidos"\n
`);
        cy.loginInvalido('standard_user', 'senha_errada');
        cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    });

    it('Não logar com campos vazios', () => {
        cy.allure().description(`
        
        Dado que estou na página de login\n
        Quando deixo o campo de usuário vazio\n
        E o campo de senha vazio\n
        E clico no botão de login\n
        Então devo visualizar uma mensagem de erro "Preencha todos os campos"\n
        E não devo ser redirecionado para a página principal\n
    `);

        cy.loginInvalido('', '');
        cy.get('[data-test="error"]').should('contain', 'Username is required');
    });

    it('Não continuar o checkout sem preencher nenhum campo', () => {
        cy.allure().description(`
    
        Dado que estou na página de checkout\n
        Quando clico no botão "Continuar" sem preencher nome, sobrenome e CEP\n
        Então visualizo uma mensagem de erro "Preencha todos os campos obrigatórios"\n
        E permanecer na mesma etapa do checkout\n
 `);
        cy.loginValido();
        cy.checkoutSemCampos();
        cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
    });

    it('Não continuar o checkout sem preencher o sobrenome', () => {
        cy.allure().description(`
    
        Dado que estou na página de checkout\n
        Quando preencho o campo de nome com "João"\n
        E deixo o campo de sobrenome vazio\n
        E preencho o campo de CEP com "12345-678"\n
        E clico no botão "Continuar"\n
        Então visualizo uma mensagem de erro "Sobrenome é obrigatório"\n
        E permanecer na mesma etapa do checkout\n

`);

        cy.loginValido();
        cy.checkoutSemSobrenome();
        cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');
    });

    it('Não continuar o checkout sem preencher o CEP', () => {
        cy.allure().description(`
    
        Dado que estou na página de checkout\n
        Quando preencho o campo de nome com "Maria"\n
        E preencho o campo de sobrenome com "Silva"\n
        E deixo o campo de CEP vazio\n
        E clico no botão "Continuar"\n
        Então devo visualizar uma mensagem de erro "CEP é obrigatório"\n
        E permanecer na mesma etapa do checkout\n
`);

        cy.loginValido();
        cy.checkoutSemCep();
        cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');
    });
});
