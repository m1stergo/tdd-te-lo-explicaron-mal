import { OrderList, useOrder } from '.'

beforeEach(() => {
  const { dispose } = useOrder();
  dispose();
})
describe('while order is empty', () => {
  it('shows message "Your order is empty"', () => {
    cy.mount(OrderList);
    cy.findByText('Your order is empty').should('exist');
  })
  it('shows total 0', () => {
    cy.mount(OrderList);
    cy.findByText('Total: 0').should('exist');
  })
})

describe('while order has items', () => {
  it('shows the list items', () => {
    cy.mount(OrderList);
    const { add } = useOrder();
    add({ id: 1, name: 'milanesa', price: 8000 })
    add({ id: 1, name: 'milanesa', price: 8000 })
    add({ id: 1, name: 'milanesa', price: 8000 })
    cy.findAllByText('milanesa').its('length').should('eq', 3);
  })
  it('shows the total price', () => {
    cy.mount(OrderList);
    const { add } = useOrder();
    add({ id: 1, name: 'milanesa', price: 8000 })
    add({ id: 1, name: 'milanesa', price: 8000 })
    add({ id: 1, name: 'milanesa', price: 8000 })
    cy.findByText('Total: 24000').should('exist');
  })
})

describe('when user clicks remove', () => {
  it('removes the item', () => {
    cy.mount(OrderList);
    const { add } = useOrder();
    add({ id: 1, name: 'milanesa', price: 8000 })
    add({ id: 1, name: 'fideos', price: 8000 })
    add({ id: 1, name: 'arroz', price: 8000 })
    cy.findByText('milanesa').click().then(() => {
      cy.findByText('milanesa').should('not.exist');
    });
  })
})