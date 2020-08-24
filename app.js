const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.get("/contact", function (req, res) {
    res.render("contact");
});

app.post("/contact", function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const comments =  req.body.comments;
    console.log(name);
    console.log(email);
    console.log(comments);
    res.redirect("thanks");
});

app.get("/login", function (req, res) {
    res.render("login");
    // if tenant, route to tenant page
    // if landlord, redirect to landlord page
});

app.get("/register", function (req, res) {
    res.render("register")
});

app.post("/register", function (req, res) {
const email = req.body.email;
const password = req.body.password;
    console.log(email);
    console.log(password);
});

app.get("/tenant", function (req, res) {
    res.render("tenant")
});

app.get("/admin", function (req, res) {
    res.render("admin")
});

app.get("/thanks", function (req, res) {
    res.render("thanks");
});





app.listen(3000, function () {
    console.log("Server is running on port 3000");
})