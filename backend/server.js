import express from 'express';
import data from './data.js'; // Important in backend append extension

// Create app express()
const app = express()

// Define first route '/' , request & response (handler of the path)
app.get('/', (req,res) => {
    res.send('Server is ready'); // response
});

// API to get details of product
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });

// Define another route for data.js
app.get('/api/products',(req,res)=>{
    res.send(data.products)
});

const port = process.env.PORT || 5000;

// Call a listen method with port 5000 and a function to call at the run of the server
app.listen(port, () =>{
    console.log(`Serve st http://localhost:${port}`)
});