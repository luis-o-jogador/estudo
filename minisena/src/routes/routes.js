const express = require("express");
const router = express.Router();
const User = require("../models/User");
const UserModel = require("../models/User");
const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.json");
const authenticateToken = require("../middlewares/authenticate"); // importe o middleware
const { updateUserAccount, decrementUserAccount } = require("../services/updateUser.js");


router.get('/', async (req, res) => {
    const userName = req.cookies.userName;
    const userAccount = req.cookies.userAccount;
    

    try {
        const users = await User.find().sort({ conta: -1 });

        res.render('home', { users, userName, userAccount });
    } catch (error) {
        console.error('Erro ao recuperar usuários:', error);
        res.status(500).send('Erro ao recuperar usuários para a página inicial');
    }
});

router.get('/game', async (req, res) => {
    const userName = req.cookies.userName;

    const token = req.cookies.token;
    if (!token) {
        console.log("no cookie token")
        return res.redirect("auth/login");
    }

    
    try {
        if (!token) {
            return res.status(401).json({
                error: true,
                message: "Token não fornecido"
            });
        }

        const decoded = jwt.verify(token, authConfig.secret);

        const user = await User.findById(decoded.id);
        const users = await User.find().sort({ conta: -1 });

        
        const userAccount = user.conta;
        console.log(user);
        console.log(user.conta);
        console.log("passou aqui");

        res.render("game", { user, userName, userAccount,users});
    }
     catch (error) {
        console.log("caiu em error")
        console.log(error);
        
    }
});


router.put('/update-account', authenticateToken, async (req, res) => {
    const { userId, value } = req.body;
    
    console.log(`Attempting to update account for userId: ${userId} with newAccountValue: ${value}`);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.conta = (user.conta || 0) + value; 
        await user.save();
        //console.log('Account updated successfully');

        res.json({ success: true, user });
    } catch (error) {
        //console.error('Error updating account:', error);
        res.status(500).json({ error: 'Error updating account' });
    }
    
});



module.exports=router;