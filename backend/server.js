import express from 'express';
import mongoose from 'mongoose'
//import data from './data.js'; // Important in backend append extension
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

// Create app express()
const app = express()

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

// let's use API userRouter
app.use('/api/users',userRouter);

app.use('/api/products', productRouter)

// Define first route '/' , request & response (handler of the path)
app.get('/', (req,res) => {
    res.send('Server is ready'); // response
});

// middleware: error chatcher in router (expressAsyncHandler)
app.use((err, req, res, next)=>{
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

// Call a listen method with port 5000 and a function to call at the run of the server
app.listen(port, () =>{
    console.log(`Serve st http://localhost:${port}`)
});