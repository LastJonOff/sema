const {Router} = require('express')
const News = require('../models/News')
const {Types} = require('mongoose')
const HomeWork = require('../models/HomeWork')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const {title, description, shortDescription, date} = req.body

        const existing = await News.findOne({ title: title })

        if (existing) {
            return res.json({ news: existing })
        }

        const news = new News({
            title, description, shortDescription, date
        })

        await news.save()

        res.status(201).json({ message: "Новость успешно создана." })

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({"date": -1});
        await res.json(news)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
        await res.json(news)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router