import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../utilities/authentication';
import { Product, productStore } from '../models/product';

const store = new productStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const result = await store.create(product);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const product: Product = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const result = await store.update(parseInt(req.params.id), product);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(parseInt(req.params.id));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const productsRouter = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, updateProduct);
  app.delete('/products/:id', verifyAuthToken, deleteProduct);
};

export default productsRouter;
