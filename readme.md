## Automação de testes E2E - Fluxo de Checkout em E-commerce

Este projeto realiza testes automatizados de ponta a ponta (E2E) em um e-commerce de exemplo, utilizando o framework **Cypress**. O foco é validar o fluxo completo de checkout, desde o login até a finalização da compra, com geração de relatórios detalhados e screenshots embutidos.

---
## Requisitos
```plaintext
Node.js ≥ 14
Cypress
lib  @faker-js/faker
```
##  Funcionalidades Testadas

#### Autenticação
 -  Login com credenciais válidas e inválidas
 -  Logout

 #### Formulários
- Validação de campos obrigatórios
- Envio de dados corretos
- Mensagens de erro para entradas inválidas

#### Funcionalidades do Produto
- Criação, edição e exclusão de itens (ex: tarefas, posts, produtos)

##  Tecnologias Utilizadas

- Cypress — Framework de testes end-to-end
- Mochawesome — Gerador de relatórios em HTML e JSON
- Allure — Plataforma avançada de relatórios com visual interativo e integração com CI/CD
- Node.js — Ambiente de execução JavaScript


## Estrutura do Projeto
```plaintext
cypress/
 e2e/
  ┗ positiveScenarios.cy.js
  ┗ negativeScenarios.cy.js
 ┣ support/
 ┃ ┣ commands.js
 ┃ ┗ e2e.js
cypress.config.js
package.json

```

##  Configuração

 Instalação


- npm install cypress

- npm install -g allure-commandline --save-dev    

- npm install @faker-js/faker --save-dev



## Comando para execução dos testes

- npx cypress run

## Modo headless com relatório:

npx cypress run --reporter cypress-mochawesome-reporter

npm run teste  - Executa os testes e gera o report do Allure de forma dinâmica

## Executar em modo interativo

- npx cypress open


## Relatórios com Screenshots:

- cypress/reports/mochawesome.html

- Allure-results

- Videos

##  Exemplo de Fixture

{
  "username": "standard_user",
  "password": "secret_sauce",
  "firstName": "Carlos",
  "lastName": "Souza",
  "postalCode": "45678"
}


## Sobre os testes:

Foram adicionadas duas funções.

```plaintext
  beforeEach(() => {
  cy.visit('/');    - Acessa a baseUrl no arquivo cypress.config.js
  cy.loginValido(); - Acessa a função nos commands

 - Cada cenário de teste possui funções específicas definidas no arquivo commands.js, facilitando a reutilização e organização do código.

 - Utilizei a funcionalidade do Allure Report para documentar os passos de cada teste de forma descritiva e clara no relatório.
 
   Exemplo de uso da função description:
  
   cy.allure().description(`

      Dado que estou na página de login do SauceDemo\n 
      Quando inserir credenciais válidas\n 
      E clicar no botão de login\n 
      Então devo ser redirecionado para a página de produtos\n 
      E visualizar a lista de produtos disponíveis\n 
`)}
)


```

##  Ajustes realizados no arquivo commands.js tornaram a estrutura mais dinâmica e flexível, permitindo a execução eficiente dos cenários de testes positivos e negativos.
```

Cypress.Commands.add('loginValido', () => {
    cy.fixture('usuario').then((usuario) => {
        cy.get('[data-test="username"]').type(usuario.username);
        cy.get('[data-test="password"]').type(usuario.password);
        cy.get('[data-test="login-button"]').click();
    });
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
})

```````



## Fluxo Automatizado da Pipeline

Disparo automático: A cada commit ou PR na branch principal (master ou develop), o pipeline é iniciado.

Instalação de dependências: O ambiente é preparado com Node.js

## Execução dos testes:

Testes E2E com Cypress
geração de relatórios: Relatórios em HTML e JSON são gerados e armazenados como artefatos.

Feedback no PR: O status dos testes é exibido diretamente no GitHub/GitLab.

## Arquivo YAML 

exemplo: .github/workflows/cypress.yml

name: Cypress Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: nstalar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Instalar dependências
        run: npm ci

      - name: Executar testes Cypress
        run: npx cypress run

      - name: Salvar resultados do Allure
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results

      - name: Gerar relatório Allure
        if: always()
        run: |
          npm install -g allure-commandline --save-dev
          allure generate allure-results --clean -o allure-report

      - name: Publicar relatório como artefato
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-report
          path: allure-report
