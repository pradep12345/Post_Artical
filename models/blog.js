const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const blogSchema = mongoose.Schema({
    title: { type: String},
    body: { type: String },
    createdBy: { type: String },
    createAt: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    dislikes: { type: Number, default: 0 },
    dislikedBy: { type: Array },
    coments: [{
        comment: { type: String },
        commentator: { type: String }
    }]
},{
    collection: "blogs"
})

module.exports = mongoose.model('Blog', blogSchema)