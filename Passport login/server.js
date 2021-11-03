const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const passport = require("passport");

const initializePassport = require("./passport-config");
initializePassport(passport);

const users = [];

// npm install ejs
app.set("view-engine", "ejs");
//ahhoz, hogy a form-ból kapjunk infókat ezt kell használni:
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (error) {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3000, () => console.log("Server started"));
