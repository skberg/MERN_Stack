require('dotenv').config()
const express = require('express')
const workoutRouts = require('./routs/workouts')
const userRouts = require('./routs/user')



//express app
const app = express()
app.use(express.json())
const monguoose = require('mongoose')
app.use((req,res,next)=>{
    console.log(req.path ,req.method)
    next()
})

//routs
app.use('/api/workouts', workoutRouts)
app.use('/api/user', userRouts)
//connect to db 
monguoose.connect(process.env.MONG_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('connecte to the DB and listening on port', process.env.PORT)
        })
        
    })
    .catch((error) =>{
        console.log(error)
    })

