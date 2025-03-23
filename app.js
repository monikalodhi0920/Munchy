const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const authRoutes = require('./routes/auth');


const MONGO_URL = "mongodb://127.0.0.1:27017/Munchy";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/login', (req, res) => {
  res.render("login");  // "login.ejs" ko views folder se render karega
});

app.get('/signup', (req, res) => {
  res.render("signup"); // "signup.ejs" ko views folder se render karega
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
