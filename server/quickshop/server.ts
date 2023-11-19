import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './app/router/product';
import authRouter from './app/router/auth';
import userRouter from './app/router/user';
import cartRouter from './app/router/cart';
import { dbConnect } from './app/config/db';
import cors, { CorsOptions } from 'cors';
const PORT = process.env.PORT || 5000;
const app = express();

const corsOptions: CorsOptions = {
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

dbConnect().then(() => {
  console.log('🚀Connected with database');
  app.listen(PORT, () => {
    console.log(`🚀Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.log('Unable to connect with the database');
  console.log(error);
});
