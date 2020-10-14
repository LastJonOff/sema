const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt  = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const nodemailer = require('nodemailer');

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 }),
        check('name', 'Минимальная длина имени 2 символа')
            .isLength({ min: 2 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }

        const {email, password, status, name, surname} = req.body

        const candidate = await User.findOne({ email })

        if(candidate){
            return res.status(400).json({message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword, status, name, surname})

        await user.save()

        res.status(201).json({message: 'Пользователь создан'})

    } catch (e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
    }
})

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({email})

            if(!user){
                return res.status(400).json({message: "Пользователь не найден"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: "Неверный пароль. Попробуйте снова"})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h'}
            )

            res.json({ token, userId: user.id, status: user.status })

        } catch (e) {
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
})

// /api/auth/sendmail
router.post(
    '/sendmail',

    async (req, res) => {
        try {

            let message = {from: '', to: '', subject: 'Информация о регистрации', text: '', html: ''}
            const {email, password, status, name, surname} = req.body

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "robolearn.staff@gmail.com",
                    pass: "robolearn"
                }
            });

            const mailOptions = {
                from: 'robolearn.staff@gmail.com',
                to: email,
                subject: 'Информация о регистрации',
                text: 'Добро пожаловать в образовательную платформу RoboCode, ' + name + ' ' + surname + '!\n' + 'Логин: ' + email + '\nПароль: ' + password
            };

            let info = await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            res.json({info: info, message: "Письмо успешно отправлено" })

        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Что-то пошло не так, попробуйте снова"})
        }
    })

module.exports = router