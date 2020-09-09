const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, maxLength: 200},
    imgSrc: {type: String},
    date: {type: Date, default: Date.now},
    tasks: [ {type: Types.ObjectId, ref: 'HomeWork'} ]
});

module.exports = model('Course', schema)