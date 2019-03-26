const mongoose = require("mongoose")
const bcrypt = require("bcrypt-nodejs")
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
const UserSchema = new Schema({
    FirstName: { type: String },
    LastName: { type: String },
    email: { type: String, unique: true },
    password: { type: String }
}, {
        collection: "login"
    })

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next()

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err)
        this.password = hash
        next()
    })
})


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)