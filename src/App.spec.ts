import App from './App.vue';

beforeEach(() => {
  cy.intercept('GET', '/api/menu', {
    fixture: 'menu',
    statusCode: 200,
  })
})

describe('app', () => {
  describe('When user clicks a list item', () => {
    it('adds the item to the order list', () => {
      cy.mount(App);
      cy.findByText('milanesa').click();
    })
  })
})