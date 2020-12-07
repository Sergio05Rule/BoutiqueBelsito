import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import sendRegisterEmail from '../AWS_SES/ses_send_register_email.js'
import sendForgotPasswordEmail from '../AWS_SES/ses_send_forgot_password_email.js'


// define multiple file for differt router, not all inside server.js
const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await User.remove({}); // remove all users!
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
          });
          return;
        }
      }
      res.status(401).send({ message: 'Email o Password inserite errate' });
    })
  );

userRouter.post(
  '/forgotpassword',
  expressAsyncHandler(async (req, res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
          const newPassword = Math.floor(100000 + Math.random() * 900000);
          console.log(newPassword);
          user.password = bcrypt.hashSync(String(newPassword), 8);
          const updatedUser = await user.save();
          res.send({ updatedUser });
          sendForgotPasswordEmail(user, newPassword);

          return;
        }
        else{
          res.status(401).send({ message: 'Password inserita non valida, non legata ad alcun account!' });
        }
      }
      
  ));

userRouter.post(
'/register',
expressAsyncHandler(async (req, res) => {
    const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
    });
    // Send register email
    sendRegisterEmail( createdUser.email, createdUser.name);
})
);

userRouter.get(
'/:id',
expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
    res.send(user);
    } else {
    res.status(404).send({ message: 'Utente non trovato' });
    }
})
);

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: generateToken(updatedUser),
        });
      }
    })
  );
  
  userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const users = await User.find({});
      res.send(users);
    })
  );

  userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        if (
          user.email === 'sergio05rule@gmail.com' || 
          user.email === 'danilobelsito10@gmail.com'
          ) {
          res.status(400).send({ message: 'Utenti Admin non possone essere cancellati' });
          return;
        }
        const deleteUser = await user.remove();
        res.send({ message: 'Utente eliminato con successo', user: deleteUser });
      } else {
        res.status(404).send({ message: 'Utente non trovato' });
      }
    })
  );

  //API for user update
  userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        //user.isSeller = req.body.isSeller || user.isSeller;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        const updatedUser = await user.save();
        res.send({ message: 'Utente aggiornato', user: updatedUser });
      } else {
        res.status(404).send({ message: 'Utente non trovato' });
      }
    })
  );
  

export default userRouter;