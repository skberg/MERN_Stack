const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')



const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        requierd: true,
        unique: true
    },
    password:{
        type: String,
        requierd: true
    }
})

// static sitnup method

userSchema.statics.signup =  async function(email, password) {
   

    //validator 
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    //inf the user exist in the DB
    const existe = await this.findOne({email})
    if(existe){
        throw Error('Email alreday in use')
    }

    //generate salt afther the user password
    const salt = await bcrypt.genSalt(10)
    const hash  = await bcrypt.hash(password, salt)
    //plasing the password in the DB
    const user = await this.create({email, password: hash})

    return user    
}



/// statics login method
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }


    // check if the user exist in the DB
    const user = await this.findOne({email})

    if(!user){
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user


}




module.exports = mongoose.model('User', userSchema)