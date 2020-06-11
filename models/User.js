const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    links: [{type: Types.ObjectId, ref: 'Link'}],
    courses: [{type: Types.ObjectId, ref: 'Course'}]
});

module.exports = model('User', schema);