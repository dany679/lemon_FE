// /// <reference types="cypress" />

// {
//   "baseUrl": "https://ui.cogmento.com/",
//   "email": "XXXXXXXX@gmail.com",
//   "password": "XXXXXXX"
// }

// //commands.js
// Cypress.Commands.add('loadEnvironmentConfig', (env) => {
//     return cy.readFile(`cypress.${env}.json`).then((config) => {
//         Cypress.config('env', config);
//     });
// });

// describe('Environment-Specific Test', () => {
//     beforeEach(() => {
//         // Load QA environment config
//         cy.loadEnvironmentConfig('qa');
//     });

//     it('Visits the specified environment', () => {
//         const baseUrl = Cypress.config('env').baseUrl; // Access environment-specific data

//         cy.visit(baseUrl); // Visit the specified URL
//         cy.title().should('have', 'Login ')
//         cy.get('input[name = "email"]').type(Cypress.config('env').email); // Use email id
//         cy.get('input[name="password"]').type(Cypress.config('env').password); // Use password
//         cy.get('input[type="submit"]').click()
//         cy.title().should('have', 'Maquinas')

//         // Perform other test actions using environment-specific data
//     });
// });
