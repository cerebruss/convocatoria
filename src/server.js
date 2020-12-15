require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";

let app = express();

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

// body parser data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config motor de vista
configViewEngine(app);

//flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// iniciar todas las rutas
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`conectandose al puerto ${port}!`));
