const {Router} = require('express')
const Course = require('../models/Course')
const {Types} = require('mongoose')
const HomeWork = require('../models/HomeWork')
const auth = require('../middleware/auth.middleware')
const router = Router()


router.get('/', async (req, res) => {
    try {
        const courses = await HomeWork.find();
        await res.json(courses)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const task = await HomeWork.findById(req.params.id)
        await res.json(task)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router