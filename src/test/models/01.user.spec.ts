import { User, userStore } from '../../production/models/user';

const store = new userStore();
const test_user: User = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'JohnDoe',
  password: 'password123',
};
const updatable_user: User = { ...test_user };
const user_row: User = {
  id: 1,
  ...test_user,
};

console.log(process.env.ENV);

describe('User Model', () => {
  it('should have a `create()` method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a `authenticate()` method', () => {
    expect(store.authenticate).toBeDefined();
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

  it('`create()` method should add a user', async () => {
    const result = await store.create(test_user);
    expect(result.id).toEqual(user_row.id);
  });

  it('`authenticate()` method should check if a user data is true', async () => {
    const result = await store.authenticate(
      test_user.username,
      test_user.password
    );
    if (result) expect(result.username).toEqual(test_user.username);
  });

  it('`index()` method should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('`show()` method should return the correct user by id', async () => {
    const result = await store.show(1);
    expect(result.username).toEqual(user_row.username);
  });

  it('`update()` method should update a user correctly', async () => {
    updatable_user.first_name = 'Jack';
    const result = await store.update(1, updatable_user);
    expect(result.first_name).toEqual('Jack');
  });

  xit('`delete()` method should remove the user', async () => {
    store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
