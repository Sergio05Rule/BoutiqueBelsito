import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import  Order from '../models/orderModel.js';
import  Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';
import sendCreateOrderEmail from '../AWS_SES/ses_send_create_order_email.js';
import sendPayedOrderEmail from '../AWS_SES/ses_send_payed_order_email.js';
import sendDeliveredOrderEmail from '../AWS_SES/ses_send_delivered_order_email.js';

const orderRouter = express.Router();

orderRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({}).populate('user', 'name');
      res.send(orders);
    })
  );
orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  );
// define the post API
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Il carello è vuoto' });
    } else {
        //init the orderModel object
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id, 
      });
      const username = req.user.name;
      const email = req.user.email;

       // check if hte trasaction is permitted
       var transaction_premitted = true;
       for (var i = 0; i < order.orderItems.length; i++)
       {
         const product_buyed = order.orderItems[i];
         const product_stock = await Product.findById(product_buyed.product);
         var obj = product_stock.sizeStockCount[0].toObject();
           for (var prop in obj) {
             if(prop === product_buyed.size)
             {
               // check if the oredered qty > stock_qty
               if (obj[prop] < product_buyed.qty)
               {
                 console.log("ANNULLO TUTTO1");
                 transaction_premitted = false;
               }
             }
         }
       }

       if(transaction_premitted)
       {
         for (var i = 0; i < order.orderItems.length; i++)
         {
           const product_buyed = order.orderItems[i];
           const product_stock = await Product.findById(product_buyed.product);
           var obj = product_stock.sizeStockCount[0].toObject();
             for (var prop in obj) {
               if(prop === product_buyed.size)
               {
                 // update the count stock qty, of the size, of the buyed product
                 obj[prop] = obj[prop] - product_buyed.qty;
               }
           }
           product_stock.sizeStockCount[0] = obj

           const updatedProduct = await product_stock.save(); //uodate the stock product
         }
       }
       else{
             res.status(404).send({ message: `Prodotto attualmente non disponibile nella quantità selezionata, perfavore effettuare un nuovo ordine o contattare l'ammistrazione all'indirizzo boutiquebelsitoshop@gmail.com per verificare la disponibilità della quantità.` });
             return;
       }

      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'Ordine creato con successo', order: createdOrder });
      
      //Sending email for createing an order
      sendCreateOrderEmail(email, username, order);
      }
  })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Ordine non trovato' });
      }
    })
  );
  
  orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
        const username = req.user.name; 
        const email = req.user.email;
        
        // Aggiorno ordine pagato
        const updatedOrder = await order.save();
        res.send({ message: 'Ordine pagato', order: updatedOrder });
        
        sendPayedOrderEmail(email, username , order);

      } else {
        res.status(404).send({ message: 'Ordine non trovato' });
      }
    })
  );

orderRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Ordine eliminato', order: deleteOrder });
        } else {
        res.status(404).send({ message: 'Ordine non trovato' });
        }
    })
);

orderRouter.put(
    '/:id/deliver',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const username = req.user.name;
        const email = req.user.email;
  
        const updatedOrder = await order.save();
        res.send({ message: 'Ordine spedito', order: updatedOrder });
        
        //Sending email for createing an order
        sendDeliveredOrderEmail(email, username, order);
        
      } else {
        res.status(404).send({ message: 'Ordine non trovato' });
      }
    })
);

export default orderRouter;