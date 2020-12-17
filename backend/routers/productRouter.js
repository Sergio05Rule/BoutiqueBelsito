import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

// Retrive products from mongoDB
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const shopCode = req.query.name || '';
    const category = req.query.category || '';
    //const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    //const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

    const products = await Product.find({
      //...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      //.populate('seller', 'seller.name seller.logo')
      .sort(sortOrder);    
      res.send(products);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

// define api: seed ; send products to MongoDB
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({}); // remove all products
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);


productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Prodotto non trovato' });
    }
  })
);

//create product API
const sizeStockCount = {
  S: 0,
  M: 0,
  L: 0,
  XL:0,
  XXL:0,
  XXXL:0,
  _40:0,
  _41:0,
  _42:0,
  _43:0,
  _44:0,
  _45:0,
  _46:0,
  _47:0,
  _48:0,
  _49:0,
  _50:0,
  _51:0,
  _52:0,
  _53:0,
  _54:0,
  _55:0,
  _56:0,
  _57:0,
  _58:0,
  _59:0,
  _60:0,
};
productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: 'sample name ' + Date.now(),
        shopCode: '0000',
        image: '/images/p1.jpg',
        price: 0,
        category: 'sample category',
        brand: 'sample brand',
        sizeStockCount: sizeStockCount,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
      });
      const createdProduct = await product.save();
      res.send({ message: 'Prodotto creato con successo', product: createdProduct });
    })
  );

productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
        product.name = req.body.name;
        product.shopCode = req.body.shopCode;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        
        const sizeStockCount = {
          S: req.body.S,
          M: req.body.M,
          L: req.body.L,
          XL:req.body.XL,
          XXL:req.body.XXL,
          XXXL:req.body.XXXL,
          _40: req.body._40,
          _41: req.body._41,
          _42: req.body._42,
          _43: req.body._43,
          _44: req.body._44,
          _45: req.body._45,
          _46: req.body._46,
          _47: req.body._47,
          _48: req.body._48,
          _49: req.body._49,
          _50: req.body._50,
          _51: req.body._51,
          _52: req.body._52,
          _53: req.body._53,
          _54: req.body._54,
          _55: req.body._55,
          _56: req.body._56,
          _57: req.body._57,
          _58: req.body._58,
          _59: req.body._59,
          _60: req.body._60,   
        };
        product.sizeStockCount = sizeStockCount;
        //product.sizeStockCount = req.body.sizeStockCount;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Prodotto aggiornato', product: updatedProduct });
        } else {
        res.status(404).send({ message: 'Prodotto non trovato' });
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Prodotto non trovato' });
      }
    })
  );

productRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Hai già scritto una recensione per questo prodotto' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Recensione creata con successo',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Prodotto non trovato' });
    }
  })
);

export default productRouter;