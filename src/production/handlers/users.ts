import express, { Request, Response } from 'express';
import { verifyAuthToken, verifyAuthUser } from '../utilities/authentication';
import { User, userStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new userStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const create = async (req: Request, res: Response) => {
  console.log(req.body);
  const user: User = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    var token = jwt.sign(
      {
        user_id: newUser.id,
        username: newUser.username,
      },
      process.env.TOKEN_KEY as string
    );
    res.status(200).json(token);
  } catch (err) {
    res.status(400).send(err);
  }
};

const update = async (req: Request, res: Response) => {
  const user: {
    first_name: string;
    last_name: string;
  } = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  try {
    const result = await store.update(parseInt(req.params.id), user);
    console.log(result);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await store.delete(parseInt(req.params.id));
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);
    if (user) {
      var token = jwt.sign(
        {
          user_id: user.id,
          username: user.username,
        },
        process.env.TOKEN_KEY as string
      );
      res.status(200).send(token);
    } else {
      res.status(401).send('invalid username or password');
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

const usersRouter = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.put('/users/:id', verifyAuthToken, verifyAuthUser, update);
  app.delete('/users/:id', verifyAuthToken, verifyAuthUser, deleteUser);
  app.post('/users/authenticate', authenticate);
};

export default usersRouter;
