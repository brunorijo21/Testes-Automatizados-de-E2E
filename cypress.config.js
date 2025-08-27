const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: true,
    video: true,
    setupNodeEvents(on, config) {
      allureWriter(on, config)
      return config;
    },
    baseUrl: 'https://www.saucedemo.com/',
    env: {
      allure: true,
      specPattern: 'cypress/e2e/**/*.cy.js',
    }
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
});
