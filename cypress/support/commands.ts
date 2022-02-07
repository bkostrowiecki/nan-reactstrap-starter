// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import * as addContext from 'mochawesome/addContext';

Cypress.on('test:after:run', (test: any, runnable) => {
  if (test.state === 'failed') {
    let item = runnable;
    const nameParts = [runnable.title];

    // Iterate through all parents and grab the titles
    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent as any;
    }

    const fullTestName = nameParts.filter(Boolean).join(' -- '); // this is how cypress joins the test title fragments

    const imageUrl = `screenshots/${Cypress.spec.name}/${fullTestName} (failed).png`;
    const videoUrl = `videos/${Cypress.spec.name}.mp4`;

    addContext({ test } as any, imageUrl);
    addContext({ test } as any, videoUrl);
  }
});
