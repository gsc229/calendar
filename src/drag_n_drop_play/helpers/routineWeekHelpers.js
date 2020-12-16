import axiosWithAuth from '../../utils/axiosWithAuth'

export const upadateRoutineExercise = (routine_exercise_id, updates) => {

    return axiosWithAuth()
    .put(`routine-exercises/${routine_exercise_id}`, updates)
    .then(upadateRoutineExerciseResponse => {
      return upadateRoutineExerciseResponse.data
    })
    .catch(upadateRoutineExerciseError => {
      console.log({upadateRoutineExerciseError})
      return upadateRoutineExerciseError.response.data
    })


}


export const getWeek = (weekId, queryStr) => {
  return axiosWithAuth()
    .get(`/routines/weeks/${weekId}?${queryStr}`)
    .then(res=>{
      console.log({res})
      return res.data
    })
    .catch(err=>{
      console.log('GET ERROR helpers.js getWeek',{err})
      return err
    })
}