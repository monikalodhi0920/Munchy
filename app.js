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

// app.get('/', (req, res) => {
//     res.render("index");
// });

app.get('/login', (req, res) => {
  res.render("login");  // "login.ejs" ko views folder se render karega
});

app.get('/signup', (req, res) => {
  res.render("signup"); // "signup.ejs" ko views folder se render karega
});

app.get('/', (req, res) => {
  const menuItems = [
      { name: "Burger", description: "Delicious cheesy burger", price: "5.99", image: "/assets/img/menu/menu-item-6.png" },
      { name: "Pizza", description: "Hot & Spicy Pepperoni", price: "8.99", image: "/assets/img/menu/menu-item-5.png" },
      { name: "Pasta", description: "Creamy white sauce pasta", price: "6.99", image: "/assets/img/menu/menu-item-4.png" },
      { name: "Fries", description: "Crispy French Fries", price: "3.99", image: "/assets/img/menu/menu-item-3.png" },
      { name: "Fries", description: "Crispy French Fries", price: "3.99", image: "/assets/img/menu/menu-item-2.png" },
      { name: "Fries", description: "Crispy French Fries", price: "3.99", image: "/assets/img/menu/menu-item-1.png" }
  ];
  
  // `index.ejs` me `menuItems` send kar raha hai
  res.render('index', { menuItems });
});

app.get('/menu', (req, res) => {
  const allDishes = [
      { name: "Cheese Burger", image: "/assets/img/menu/menu-item-6.png", category: "burgers" },
      { name: "Pepperoni Pizza", image: "/assets/img/menu/menu-item-6.png", category: "pizza" },
      { name: "White Sauce Pasta", image: "/assets/img/menu/menu-item-6.png", category: "pasta" },
      { name: "Chocolate Shake", image: "/assets/img/menu/menu-item-6.png", category: "drinks" },
      { name: "Cheese Burger", image: "/assets/img/menu/menu-item-6.png", category: "burgers" },
      { name: "Pepperoni Pizza", image: "/assets/img/menu/menu-item-6.png", category: "pizza" },
      { name: "Cheese Burger", image: "/assets/img/menu/menu-item-6.png", category: "burgers" },
      { name: "Pepperoni Pizza", image: "/assets/img/menu/menu-item-6.png", category: "pizza" }
  ];

  const category = req.query.category || "all";
  const dishes = category === "all" ? allDishes : allDishes.filter(dish => dish.category === category);

  res.render('menu', { dishes });
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
