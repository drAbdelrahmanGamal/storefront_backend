import { Order, orderStore } from '../../production/models/order';

const store = new orderStore();
const test_order: Order = {
  status: 'active',
  user_id: '1',
};
const order_row: Order = {
  id: 1,
  ...test_order,
};
const updated_order_row: Order = { ...order_row };

describe('Order Model', () => {
  it('should have a `create()` method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an `index()` method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a `show()` method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a `addProduct()` method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should have an `update()` method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a `delete()` method', () => {
    expect(store.delete).toBeDefined();
  });

  it('`create()` method should add new order', async () => {
    const result = await store.create(test_order);
    expect(result).toEqual(order_row);
  });

  it('`index()` method should return a list of all orders', async () => {
    const result = await store.index();
    expect(result).toEqual([order_row]);
  });

  it('`show()` method should return the correct order by id', async () => {
    const result = await store.show(1);
    expect(result).toEqual(order_row);
  });

  it('`addProduct()` method should add products to the order', async () => {
    const result = await store.addProduct(200, '1', '1');
    expect(result).toEqual({
      id: 1,
      quantity: 200,
      order_id: '1',
      product_id: '1',
    });
  });

  it('`update()` method should update a order correctly', async () => {
    const result = await store.update(1, 'complete');
    updated_order_row.status = 'complete';
    expect(result).toEqual(updated_order_row);
  });

  it('`delete()` method should remove the order from orders database and its related order products in order_products database', async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
