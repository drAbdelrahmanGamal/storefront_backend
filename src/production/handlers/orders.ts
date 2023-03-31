import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../utilities/authentication';
import { Order, orderStore } from '../models/order';

const store = new orderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(400).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const order: Order = {
    status: req.body.status,
    user_id: req.body.user_id,
  };

  try {
    const result = await store.create(order);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const status: string = req.params.status;
  try {
    const result = await store.update(parseInt(req.params.id), status);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(parseInt(req.params.id));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: string = req.body.productId;
  const quantity: number = parseInt(req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRouter = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, updateOrder);
  app.delete('/orders/:id', verifyAuthToken, deleteOrder);
  // add products to order
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
};

export default ordersRouter;
