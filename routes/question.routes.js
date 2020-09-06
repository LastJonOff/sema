const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Question = require('../models/Question')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        await res.json(questions)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router