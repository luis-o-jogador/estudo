const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find().sort({ conta: -1 });

        res.render('leaderboard', { users });
    } catch (error) {
        console.error('Erro ao recuperar usuários:', error);
        res.status(500).send('Erro ao recuperar usuários a leaderboard');
    }
});

router.get('/game', async (req, res) => {
    try {
        const users = await User.find().sort({ conta: -1 });

        res.render('game', { users });
    } catch (error) {
        console.error('Erro ao recuperar usuários:', error);
        res.status(500).send('Erro ao recuperar usuários para a página inicial');
    }
});

module.exports = router;