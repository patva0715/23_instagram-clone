const { mongoose } = require("mongoose")
const bcrypt = require('bcryptjs')



const schema = new mongoose.Schema({
    name: String,
    userName: String,
    password: String,
    email: String,

},{
    timestamp:true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', schema)
module.export = User