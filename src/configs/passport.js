import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Ensure the correct import

export default function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Find the user by email
      User.findOne({ email }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Compare password with hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user); // Successful authentication
          } else {
            return done(null, false, { message: 'Password incorrect' }); // Failed authentication
          }
        });
      });
    })
  );

  // Serialize user to store user ID in session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
