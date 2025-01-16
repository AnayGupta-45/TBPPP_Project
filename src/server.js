import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import {fileURLToPath} from "url";
import path from "path";
import dbConnect from "./configs/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

dbConnect();

// Routes GET Request..
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get('/about',(req,res)=>{
  res.render('anay');
})

// Middlewares..
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Routes POST Request..

// Listen The PORT..
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
