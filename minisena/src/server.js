const express = require('express');
const session = require('express-session');
const AuthController = require("./controllers/AuthController");
const AdminController = require("./controllers/AdminController");
const pasth = require('path');
const bodyParser = require('body-parser');
const leaderboardRoutes = require('./routes/leaderboard');
const cookieParser = require('cookie-parser');
const path = require("path");


const jwt = require("jsonwebtoken");
const authConfig = require("./config/auth.json");
const { decrementUserAccount } = require("./services/updateUser.js");
const { User } = require("./models/User");



const authenticateMiddleware = require("./middlewares/authenticate");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret: "my secret key",
    saveUnitialized: true,
    resave: false
}));

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});


app.set("view engine","ejs");

app.use(express.static("public"));

app.use(express.json());

app.use("/auth",AuthController);
app.use("/admin",authenticateMiddleware,AdminController);

app.use('/leaderboard', leaderboardRoutes);

app.use("",require("./routes/routes"));
app.get("/auth/login",(req,res)=>{
    res.render("login");
});

app.post("/auth/login", async (req, res) => {
    console.log("Recebida uma requisição POST em /auth/login");
    try {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        
        const result = await collection.insertOne(data);
        console.log("Usuário cadastrado:", result.ops[0]);
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.get("/auth/signup",(req,res)=>{
    res.render("signup");
});

app.post("/auth/signup", async (req, res) => {
    console.log("Recebida uma requisição POST em /auth/signup");
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };
        
        const result = await collection.insertOne(data);
        console.log("Usuário cadastrado:", result.ops[0]);
        res.redirect('/');
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        res.status(500).send("Erro interno do servidor");
    }
});
app.listen(3001,()=>{
    console.log("server rodando");
});