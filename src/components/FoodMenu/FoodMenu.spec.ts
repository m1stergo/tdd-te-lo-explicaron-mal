import { FoodMenu } from ".";
import { useOrder } from '../Order'

beforeEach(() => {
  cy.intercept('GET', '/api/menu', {
    fixture: 'menu',
    statusCode: 200,
  })
})

describe('While fetching', () => {
  it('shows a loading indicator', () => {
    cy.mount(FoodMenu)
    cy.findByText('Loading...').should('exist')
  })
  describe('if fetching fails', () => {
    it('pops a message "something went wrong, please refresh the page or contact support"', () => {
      cy.intercept('GET', '/api/menu', {
        fixture: 'menu',
        statusCode: 500,
      })
      cy.mount(FoodMenu);
      cy.findByText('something went wrong, please refresh the page or contact support')
    })
  })
})

describe('While there are fetch results', () => {
  it('shows a search input', () => {
    cy.mount(FoodMenu);
    cy.findByTestId('search').should('exist');
  })
  describe('While search is empty', () => {
    it('shows all the items', () => {
      cy.mount(FoodMenu);
      cy.findByText('milanesa').should('exist');
      cy.findByText('arroz').should('exist');
      cy.findByText('fideos').should('exist');
    })
  })

  describe('While search input is filled and search matches', () => {
    it('shows the matching results', () => {
      cy.mount(FoodMenu);
      cy.findByTestId('search').type('milanesa')
      cy.findByText('milanesa').should('exist');
      cy.findAllByTestId('search-result').its('length').should('eq', 1)
    })
  })

  describe('While search input is filled and search does not match', () => {
    it('shows message "no results matching your search"', () => {
      cy.mount(FoodMenu);
      cy.findByTestId('search').type('lechuga')
      cy.findByText('no results matching your search').should('exist')
    })
  })
})