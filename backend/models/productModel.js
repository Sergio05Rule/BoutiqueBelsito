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
    _40: { type: Number, required: true },
    _41: { type: Number, required: true },
    _42: { type: Number, required: true },
    _43: { type: Number, required: true },
    _44: { type: Number, required: true },
    _45: { type: Number, required: true },
    _46: { type: Number, required: true },
    _47: { type: Number, required: true },
    _48: { type: Number, required: true },
    _49: { type: Number, required: true },
    _50: { type: Number, required: true },
    _51: { type: Number, required: true },
    _52: { type: Number, required: true },
    _53: { type: Number, required: true },
    _54: { type: Number, required: true },
    _55: { type: Number, required: true },
    _56: { type: Number, required: true },
    _57: { type: Number, required: true },
    _58: { type: Number, required: true },
    _59: { type: Number, required: true },
    _60: { type: Number, required: true },
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