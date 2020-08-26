require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require("mongoose-findorcreate");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/tenland",
        userProfileURL: "https://googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/auth/google",
    passport.authenticate('google', {
        scope: ["profile"]
    }));

app.get("/auth/google/tenland",
    passport.authenticate('google', {
        failureRedirect: "/login"
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/admin");
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
    const comments = req.body.comments;
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
    if (req.isAuthenticated()) {
        res.render("admin");
    } else {
        res.render("/login")
    }

});

app.get("/thanks", function (req, res) {
    res.render("thanks");
});





app.listen(3000, function () {
    console.log("Server is running on port 3000");
})