import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import { fileURLToPath } from "url";
import path from "path";
import dbConnect from "./configs/db.js";
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/users.js';
import flash from "connect-flash";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

dbConnect();

// Routes GET Request.
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.use(session({
  secret: 'Palak', // Secret for signing the session ID cookie
  resave: false, // Don't force session to be saved on every request
  saveUninitialized: false, // Don't save uninitialized sessions
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// Routes
app.use('/', authRoutes);
app.use('/users', usersRoutes);

// Middlewares..
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Routes POST Request..
app.post("/signup", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/home',
    failureFlash: true,
  })(req, res, next);
});

app.post("/signin", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
});

// POST Route for user dashboard
app.post("/dashboard", (req, res) => {
  res.render("dashboard", { user: req.user });
});

// POST Route for logout
app.post("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/signin");
});

// Listen The PORT..
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
