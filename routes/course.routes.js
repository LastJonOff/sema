const {Router} = require('express')
const Course = require('../models/Course')
const {Types} = require('mongoose')
const HomeWork = require('../models/HomeWork')
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

router.post('/createtask', async (req, res) => {
    try {
        const {title, task, courseName} = req.body
        const existingCourse = await Course.findOne({ title: courseName })
        const courseId = existingCourse._id

        if (existingCourse) {
            const existing = await HomeWork.findOne({ title: title })

            if (existing) {
                return res.json({ task: existing })
            }

            const newTask = new HomeWork({
                title, task, courseId
            })

            const saveTask = await newTask.save()
            const taskId = saveTask._id

            await Course.updateOne( {_id: existingCourse._id}, { $push: {tasks: taskId } } )

            res.status(201).json({ message: 'Домашнее задание успешно добавлено' })
        }
        else {
            res.status(500).json({message: 'Курс не найден, попробуйте снова'})
        }
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ', e })
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
        const course = await Course.findById(req.params.id)
        console.log(course.tasks)
        await res.json(course)
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router