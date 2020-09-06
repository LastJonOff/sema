const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt  = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/', async (req, res) => {
    try {
        const users = await User.findById(req.body.id);
        await res.json(users)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/update', async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.updateOne({_id: req.body.id},{
            name: req.body.name,
            surname: req.body.surname
        });
        await res.json(user)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router