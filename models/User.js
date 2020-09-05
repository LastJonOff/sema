const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String},
    surname: {type: String},
    status: {type: String},
    links: [{type: Types.ObjectId, ref: 'Link'}],
});

module.exports = model('User', schema);