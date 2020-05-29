const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tags = require('./tags')

let Article = new Schema({
    title: {
        type: String,
        default: 'No Title'
    },
    body: {
        type: String,
        default: 'No Body'

    },
    author: {
        type: String,
        default: 'Anonomyous'
    },
    date: {
        type: Date,
        default: Date.now
    },
    brief_description: {
        type: String,
        default: 'No Description'
    },
    comments: [{
        commentBody: String,
        commentAuthor: {
            type: String,
            default: 'Anonomyous'
        },
        commentDate: {
            type: Date,
            default: Date.now
        },

    }],
    tags: {
        type: { Tags },
        default: {}
    },
    likes: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Article', Article);

