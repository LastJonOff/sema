const {Router} = require('express')
const Course = require('../models/Course')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const {title, description, imgSrc, date} = req.body

        const existing = await Course.findOne({ title: title })
        if (existing) {
            return res.json({ course: existing })
        }

        const course = new Course({
            title, description, imgSrc, date
        })

        await course.save()

        res.status(201).json({ course })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        await res.json(courses)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Course.findById(req.params.id)
        await res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router