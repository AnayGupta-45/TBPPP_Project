import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import passport from 'passport';
import User from '../models/User.js';  // Corrected import
import { forwardAuthenticated } from '../configs/auth.js';

// Sign in Page
router.get('/signin', forwardAuthenticated, (req, res) => res.render('signin'));

// Sign up Page
router.get('/signup', forwardAuthenticated, (req, res) => res.render('signup'));

// Register
router.post('/signup', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    return res.render('signup', { errors, name, email, password, password2 });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      errors.push({ msg: 'Email already exists' });
      return res.render('signup', { errors, name, email, password, password2 });
    }

    const newUser = new User({
      username: name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    
    await newUser.save();
    req.flash('success_msg', 'You are now registered and can log in');
    res.redirect('/signin');
  } catch (err) {
    console.error(err);
  }
});

// Login
// Signin Route
router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard', // Redirect on successful login
      failureRedirect: '/signin',   // Redirect on failed login
      failureFlash: true,            // Flash the failure message
    })(req, res, next);
  });
      

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/signin');
});

export default router;
