const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const UserModel = require("../models/User");

const router = express.Router();

const generateToken = (user = {})=>{
    return jwt.sign({
        id: user.id,
        name: user.name
    },authConfig.secret,{
        expiresIn:86400
    });
}

router.post("/signup",async(req,res)=>{

    const {name,email,password,confirmPassword}=req.body;
    if(!name || !email || !password || !confirmPassword) {
        return res.status(422).json({msg:"erro na formatação"})
    }
    if (password !== confirmPassword) {
        return res.status(422).json({msg:"senhas diferentes"})
    }


    if(await UserModel.findOne({email})) {
        return res.status(400).json({
            error:true,
            message:"Esse email já foi cadastrado"
        });
    }
    const user = await UserModel.create(req.body);

    user.password=undefined;

    const token = generateToken(user)

    res.cookie('token', token, { httpOnly: true, secure: true });

    res.redirect("/");
})

router.post("/login", async(req,res)=>{
    const {email,password}=req.body;
    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(400).json({
            error:true,
            message:"Usuário não encontrado"
        });
    }


    if (!await bcrypt.compare(password,user.password)) {
        return res.status(400).send({
            error:true,
            message:"Senha inválida"
        })
    }

    user.password=undefined;

    const token = generateToken(user)

    res.cookie("token", token, { httpOnly: true, secure: true });


    res.cookie("userName", user.name);
    res.cookie("userAccount", user.conta);

    res.redirect("/");
});

module.exports=router;