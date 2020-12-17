import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from 'server/dbConnect';
import { serialize } from 'cookie';
import Cors from 'cors'
import { runMiddleware } from 'server/utils';

const { User } = require("models/User");
const jwt = require("jsonwebtoken");

dbConnect();

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: true,
  credentials: true
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, cors)

  if (req.method === 'POST') {
    console.log('auth posting token');
    const user = await User.findOne({ id: req.body.id });
    if (user) {
      console.log('user already exists: ' + user);
      const token = createToken(user);
      res.setHeader('Set-Cookie', serialize('user', String(token)));
      res.status(201).json({
        result: 'ok',
        token
      });    
    } else {
      console.log('new user');
      const user = new User(req.body);
      user.save((err, user) => {
        if(err) {
          console.log(err);
        } else {
          console.log(user);
        }
      });
      const token = createToken(user);
      res.setHeader('Set-Cookie', serialize('user', String(token)));
      res.status(201).json({
        result: 'ok',
        token
      });   
    }
  } else {
    console.log('auth getting token');
    // console.log(req.body);
  }
}

function createToken(user) {
  const token = jwt.sign({
    id: user.id
  }, SECRET_KEY, {
    expiresIn: '1h'
  });
  console.log("token: " + token);

  return token;
}