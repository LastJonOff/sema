const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    task: {type: String, required: true},
    courseId: {type: Types.ObjectId, ref: 'Course'}
});

module.exports = model('HomeWork', schema)