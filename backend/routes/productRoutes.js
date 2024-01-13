const express = require('express');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Product = require('../models/productModel.js');
const { isAuth, isAdmin, generateToken} = require('../utils.js');
const cors = require('cors');
const productRouter = express.Router();
productRouter.use(cors());

//end point to create a product
productRouter.post(
    '/addProduct',isAuth, isAdmin,
    expressAsyncHandler(async (req, res) => {
      const newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price:req.body.price,
        status:req.body.status,
        rating: req.body.rating,
        numReviews:req.body.numReviews,
        image: req.body.image,
      });
      const product = await newProduct.save();
      res.send({ message: 'Product Created', product });
    })
  );
  //end point to get all product
  productRouter.get('/getProduct',isAuth, async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });
//end point to update a product
  productRouter.put(
    '/updateProduct/:id',isAuth, isAdmin,
    expressAsyncHandler(async (req, res) =>{
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name= req.body.name,
        product.category= req.body.category,
        product.description= req.body.description,
        product.price=req.body.price,
        product.status=req.body.status,
        product.rating= req.body.rating,
        product.numReviews=req.body.numReviews,
        product.image= req.body.image,
        await product.save();
        res.send({ message: 'Product Updated' });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  //endpoint to delete a product
  productRouter.delete(
    '/deleteProduct/:id',isAuth, isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.deleteOne();
        res.send({ message: 'Product Deleted' });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );
  //to get a particular Product
  productRouter.get('/getProduct/:id', isAuth,async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  });
  module.exports=productRouter;