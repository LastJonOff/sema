const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, maxLength: 200},
    imgSrc: {type: String},
    date: {type: Date, default: Date.now},
});

module.exports = model('Course', schema)