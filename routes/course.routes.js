const {Router} = require('express')
const config = require('config')
const short = require('shortid')
const Course = require('../models/Course')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body

        const code = short.generate()

        const existing = await Course.findOne({ from })

        if (existing) {
            return res.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code

        const link = new Course({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({ link })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.delete('/remove', auth, async (req, res) => {
    try {
        const link = await Course.findOneAndDelete({ _id: req.body.id })
        res.status(200).json({ message: 'Запись удалена' })
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const courses = await Course.find({ owner: req.user.userId })
        res.json(courses)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Course.findById(req.params.id)
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router