## Automação de testes E2E - Fluxo de Checkout em E-commerce

Este projeto realiza testes automatizados de ponta a ponta (E2E) em um e-commerce de exemplo, utilizando o framework **Cypress**. O foco é validar o fluxo completo de checkout, desde o login até a finalização da compra, com geração de relatórios detalhados e screenshots embutidos.

---
## Requisitos

Node.js ≥ 14

npm ≥ 6
##  Funcionalidades Testadas

-  Login com credenciais válidas
-  Adição de produto ao carrinho
-  Preenchimento do formulário de checkout
-  Finalização da compra
-  Validação de mensagem de sucesso
-  Geração de relatório com screenshots

---

##  Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/) — Framework de testes E2E
- [Mochawesome](https://github.com/adamgruber/mochawesome) — Gerador de relatórios HTML/JSON
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) — Integração com Cypress para relatórios com screenshots

## Estrutura do Projeto
📁 cypress/ <br>
 ┣ 📁 e2e/<br>
 ┃ ┗ api.cy.js<br>
 ┣ 📁 support/<br>
 ┃ ┣ commands.js<br>
 ┃ ┗ e2e.js<br>
cypress.config.js
-

##  Configuração

 Instalação


- npm install

-  npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator cypress-mochawesome-reporter




## Executar os testes

- npx cypress run

## Modo headless com relatório:

npx cypress run --reporter cypress-mochawesome-reporter

## Executar em modo interativo

- npx cypress open


## Relatórios com Screenshots:

cypress/reports/mochawesome.html



##  Exemplo de Fixture

{
  "username": "standard_user",
  "password": "secret_sauce",
  "firstName": "Carlos",
  "lastName": "Souza",
  "postalCode": "45678"
}


## Comandos
```
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('checkout', (firstName, lastName, postalCode) => {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

```````


 Este projeto está integrado a um pipeline de CI/CD que executa testes automatizados após cada commit ou pull request. O objetivo é garantir qualidade contínua e detectar falhas o mais cedo possível.

## Fluxo Automatizado Pipeline
Disparo automático: A cada commit ou PR na branch principal (master ou develop), o pipeline é iniciado.

Instalação de dependências: O ambiente é preparado com Node.js, bibliotecas de teste e drivers mobile.

## Execução dos testes:

Testes E2E com Cypress
eração de relatórios: Relatórios em HTML e JSON são gerados e armazenados como artefatos.

Feedback no PR: O status dos testes é exibido diretamente no GitHub/GitLab.

## Arquivo YAML 

exemplo: .github/workflows/test.yml


name: Run Tests
on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - name: Checkout código
        uses: actions/checkout@v3

      - name: Instalar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Instalar dependências
        run: npm install

    
      - name: Executar testes E2E (Cypress)
        run: npx cypress run --reporter mochawesome

     
      - name: Upload de relatórios
        uses: actions/upload-artifact@v3
        with:
          name: test-reports
          path: cypress/reports/

