const express = require('express')
const {
    createWorkout,
    getallWorkouts,
    getONEWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workout_controllers')

const router = express.Router()


//GET all workouts
router.get('/', getallWorkouts)


//GET a singel workout
router.get('/:id', getONEWorkout)


//POST a new workout
router.post('/', createWorkout)


//Delete a new workout
router.delete('/:id', deleteWorkout)

//update a new workout
router.patch('/:id', updateWorkout)


module.exports = router