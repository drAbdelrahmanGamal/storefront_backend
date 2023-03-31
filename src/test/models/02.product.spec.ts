import { Product, productStore } from '../../production/models/product';

const store = new productStore();
const test_product: Product = {
  name: 'test',
  price: 200,
};
const updatable_product: Product = { ...test_product };
const product_row: Product = {
  id: 1,
  ...test_product,
};
const updated_product_row: Product = { ...product_row };

describe('Product Model', () => {
  it('should have a `create()` method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an `index()` method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a `show()` method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an `update()` method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a `delete()` method', () => {
    expect(store.delete).toBeDefined();
  });

  it('`create()` method should add new product', async () => {
    const result = await store.create(test_product);
    expect(result).toEqual(product_row);
  });

  it('`index()` method should return a list of all products', async () => {
    const result = await store.index();
    expect(result).toEqual([product_row]);
  });

  it('`show()` method should return the correct product by id', async () => {
    const result = await store.show(1);
    expect(result).toEqual(product_row);
  });

  it('`update()` method should update a product correctly', async () => {
    updatable_product.price = 500;
    const result = await store.update(1, updatable_product);
    updated_product_row.price = 500;
    expect(result).toEqual(updated_product_row);
  });

  xit('`delete()` method should remove the product', async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
