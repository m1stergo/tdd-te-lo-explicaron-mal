/// <reference types="cypress" />

import { useOrder } from '.'
beforeEach(() => {
  const { dispose } = useOrder();
  dispose();
})

describe('useOrder', () => {
  it('add items', () => {
    const { items, add} = useOrder();
    expect(items.value.length).to.eq(0)
    add({ id:1, name: 'milanesa' });
    expect(items.value[0].name).to.eq('milanesa')
  })

  it('remove items', () => {
    const { items, add, remove } = useOrder();
    expect(items.value.length).to.eq(0)
    add({ id:1, name: 'milanesa' });
    add({ id:2, name: 'fideos' });
    add({ id:3, name: 'arroz' });
    expect(items.value[0].name).to.eq('milanesa')
    remove(items.value[0].orderId)
    expect(items.value.length).to.eq(2)
    expect(items.value[0].name).to.eq('fideos')
  })

  it('disposes', () => {
    const { items, add, dispose } = useOrder();
    add({ id: 2, name: 'milanesa'})
    expect(items.value.length > 0).to.be.true;
    dispose();
    expect(items.value.length == 0).to.be.true;
  })
})