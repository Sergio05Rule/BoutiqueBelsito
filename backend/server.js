import express from 'express';
import mongoose from 'mongoose'
//import data from './data.js'; // Important in backend append extension
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv'
import path from 'path';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';


dotenv.config();

// Create app express()
const app = express();
app.use(express.json()); // parsing json data
app.use(express.urlencoded({ extended: true}));

//connect to moognose, input: mongoDB_url,option
mongoose.connect( process.env.MONGODB_URL ||  'mongodb://localhost/BoutiqueBelsito',{
    useNewUrlParser: true, // remove deprected warning
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// API to get details of product, now in productRouter
/*
    before backend
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });
*/

app.use('/api/uploads', uploadRouter);
// let's use API userRouter
app.use('/api/users',userRouter);

app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });

const __dirname = path.resolve(); // return the current folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Define first route '/' , request & response (handler of the path)
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
/*
app.get('/', (req,res) => {
    res.send('Server is ready'); // response
});
*/

// middleware: error chatcher in router (expressAsyncHandler)
app.use((err, req, res, next)=>{
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// Call a listen method with port 5000 and a function to call at the run of the server
app.listen(port, () =>{
    console.log(`Serve st http://localhost:${port}`)
});