import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
          name: 'Sergio',
          email: 'sergio05abascia@gmail.com',
          password: bcrypt.hashSync('boutiquebelsito1234', 8), // crypted
          isAdmin: true,
        },
        {
          name: 'Danilo',
          email: 'danilobelsito10@gmail.com',
          password: bcrypt.hashSync('boutiquebelsito1234', 8),
          isAdmin: true,
        },
      ],
    products:[
        {
            name: 'Top Donna Backend',
            category: 'Shirts',
            image: '/images/capo1.jpeg',
            price: 120,
            brand: 'Nike',
            rating: 4,
            numReviews: 10,
            description: 'hight quality product',
            countInStock: 100,
        },
        {
            name: 'Top Donna 2',
            category: 'Shirts',
            image: '/images/capo2.jpeg',
            price: 22,
            brand: 'Nike',
            rating: 1,
            numReviews: 1 ,
            description: 'hight quality product',
            countInStock: 0,
        },
        {
            name: 'Red Dress',
            category: 'Dress',
            image: '/images/capo3.jpeg',
            price: 1000,
            brand: 'Nike',
            rating: 5,
            numReviews: 99,
            description: 'hight quality product',
            countInStock: 3,
        },
        {
            name: 'PS5',
            category: 'console',
            image: '/images/ps5.jpeg',
            price: 499,
            brand: 'Sony Playstation',
            rating: 5,
            numReviews: 10,
            description: 'PS5 Sony Playstation 5',
            countInStock: 1,
        },
    ],
};

export default data;