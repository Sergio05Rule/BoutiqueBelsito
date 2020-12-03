import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const sizeStockCountSchema = new mongoose.Schema(
  {
    S: { type: Number, required: true },
    M: { type: Number, required: true },
    L: { type: Number, required: true },
    XL: { type: Number, required: true },
    XXL: { type: Number, required: true },
    XXXL: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// define schema of the product
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    shopCode: { type: String, required: true},
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    //countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    sizeStockCount: [sizeStockCountSchema],
  },
  {
    timestamps: true,
  }
);
// create the model for the schema
const Product = mongoose.model('Product', productSchema);
// export the module
export default Product;