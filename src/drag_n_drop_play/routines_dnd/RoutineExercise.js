import React from 'react'

const RoutineExercise = ({routine_exercise}) => {

  const {exercise, day} = routine_exercise

  return (
    <div>
      <h5 style={{fontSize: '1.5vw'}}>{exercise.name}</h5>
      <p>{day}</p>
    </div>
  )
}

export default RoutineExercise
