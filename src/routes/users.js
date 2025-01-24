import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import passport from 'passport';
// Load User model
import { forwardAuthenticated } from '../configs/auth.js';

// Sign in Page
router.get('/signin', forwardAuthenticated, (req, res) => res.render('signin'));

// Sign up Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

// Register
router.post('/signup', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }


  if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new user({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/signin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/signin', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
});



export default router;