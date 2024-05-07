const Workout = require('../models/WorkoutModules')
const mongoose = require('mongoose')

//all workouts

const getallWorkouts = async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Bruker ikke autentisert" });
  }

  const user_id = req.user._id;

  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    if (workouts.length === 0) {
      return res.status(404).json({ message: "Ingen treningsøkter funnet for brukeren" });
    }

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Feil under henting av treningsøkter:', error);
    res.status(500).json({ message: "Serverfeil ved henting av treningsøkter" });
  }
}









//get a single workout
const getONEWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}




//create a workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }


  //add doc to db 
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, load, reps, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndDelete({ _id: id })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such workout' })
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(workout)
}



module.exports = {
  createWorkout,
  getallWorkouts,
  getONEWorkout,
  deleteWorkout,
  updateWorkout
}