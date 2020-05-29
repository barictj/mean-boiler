// const cookieSession = require("cookie-session");
const express = require("express");
const app = express();

// const urlObject = require('./baseURL')
// const passport = require("passport");
// const passportSetup = require("./config/passport-setup");
// const session = require("express-session");
// const authRoutes = require("./routes/auth-routes");
const ArticleRoutes = require("./routes/article-routes");

// const keys = require("./config/keys");
// const cors = require("cors");
// const cookieParser = require("cookie-parser"); // parse cookie header


// const baseURL = urlObject.baseURL

// app.use(
//     cookieSession({
//         name: "session",
//         keys: [keys.COOKIE_KEY],
//         maxAge: 24 * 60 * 60 * 100
//     })
// );

// parse cookies
// app.use(cookieParser());

// initalize passport
// app.use(passport.initialize());
// // deserialize cookie from the browser
// app.use(passport.session());

// set up routes
// app.use("/auth", authRoutes);
app.use("/article", ArticleRoutes);

// const authCheck = (req, res, next) => {
//     if (!req.user) {
//         res.status(401).json({
//             authenticated: false,
//             message: "user has not been authenticated"
//         });
//     } else {
//         next();
//     }
// };

const allRoutes = app
module.exports = allRoutes
