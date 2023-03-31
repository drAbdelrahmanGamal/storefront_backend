# StoreFront Backend

this is an database handler api that can use in creating and managing online Stores.

## inistall

to install the project please run `npm i` or `npm install`

## usage

### build

to build the project run `npm run build`

### test

for testing run the following script `npm run test`
it will do the following:

- build the project to javascript (to build only use `npm run build`).
- configure the test database by reseting it and making it clean to work with (to reset the database only use `npm run testdb`).
- setting the environment variable to test environment.
- test the whole project

### run in development mode

to run project from typescript in developing mode run `npm run dev`

### start

to start the javascript project after building it run `npm run start`

> [**NOTE**: you should build before starting the javascript project]

## End points

valid endpoints to be tested
the server will run in port **3000**

### Main endpoint

the main endpoint: `localhost:3000/` this just saying hello world

### Users endpoints

- adding new user: `localhost:3000/users` by http request `post` and including body contains user data in the form of:

``` json
{
  "first_name": string,
  "last_name": string,
  "username": string,
  "password": string
}
```

in `json` formate if you use `postman` programe and recieve the token created to that user.

- getting all users: `localhost:3000/users` by http request `get`.
- show one user by id: `localhost/3000/users/:user_id` by http request `post`.
- log in with a user: `localhost/3000/users/authenticate` by http request `post` and adding a body contain the log in information of that user in the form of:

```json
{
  "username": string,
  "password": string
}
```

in `json` formate if you use `postman` programe and you will get the token created for that user.

- updata a user: `localhost/3000/users/:user_id` by http request `put` and including body contains new user data in the form of:

``` json
{
  "first_name": string,
  "last_name": string,
}
```

in `json` formate if you use `postman` programe and including authentication parameters through the token you received when creating the user.

- delete a user: `localhost/3000/users/:user_id` by http request `delete` and including authentication parameters through the token you received when creating the user.

### Products endpoints

- adding new product: `localhost:3000/products` by http request `post` and including body contains product data in the form of:

``` json
{
  "name": string,
  "price": number,
}
```

in `json` formate if you use `postman` programe.

- getting all products: `localhost:3000/products` by http request `get`.
- show one product by id: `localhost/3000/products/:product_id` by http request `post`.
- updata a product: `localhost/3000/products/:product_id` by http request `put` and including body contains new product data in the form of:

``` json
{
  "first_name": string,
  "last_name": string,
}
```

in `json` formate if you use `postman` programe

- delete a product: `localhost/3000/products/:product_id` by http request `delete`.

> You should provide the authentication parameters in the header of your request through the token you received when creating or log in with your user in `update` and `delete` methods.

### Orders endpoints

- adding new order: `localhost:3000/orders` by http request `post` and including body contains order data in the form of:

``` json
{
  "status": string,
  "user_id": string,
}
```

in `json` formate if you use `postman` programe.

- getting all orders: `localhost:3000/orders` by http request `get`.
- show one order by id: `localhost/3000/orders/:order_id` by http request `post`.
- ordering new products inside that order: `localhost:3000/orders/:order_id/products` by http request `post` and including body contains the product data in the form of:

``` json
{
  "quantity": string,
  "product_id": string,
}
```

in `json` formate if you use `postman` programe.

- updata an order: `localhost/3000/orders/:order_id` by http request `put` and including body contains new order data in the form of:

``` json
{
  "status": string
}
```

in `json` formate if you use `postman` programe

- delete an order: `localhost/3000/orders/:order_id` by http request `delete`.

> You should provide the authentication parameters in the header of your request through the token you received when creating or log in with your user in `update` and `delete` methods.
