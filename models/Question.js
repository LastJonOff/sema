const {Schema, model} = require('mongoose')

const schema = new Schema({
    question: {type: String},
    answer: {type: String},
});

module.exports = model('Question', schema)