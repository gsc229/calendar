import {useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import axiosWithAuth from './utils/axiosWithAuth'
import Calendar from './main_calendar/Calendar'
import Menu from './menu/Menu'
import DashBoard from './dashboard/Dashboard'
import CreateRoutine from './routines/CreateRoutine'
import FindRoutine from './routines/FindRoutine'
import MyRoutines from './routines/MyRoutines'
import BrowseExercises from './routines/BrowseExercises'
import Goals from './goals/Goals'
import Progress from './progress/Progress'

import DragAndDropPlay from './drag_n_drop_play/DragAndDropPlay'
import DragAndDrop2 from './drag_n_drop_play/log_rocket_example/DragAndDrop2'

function App() {
  
  const [routines, setRoutines] = useState([{}])
  
  useEffect(()=>{
    axiosWithAuth()
    .get('/routines?populate_one=weeks&populate_two=exercises&populate_three=exercise')
    .then(res=>{
      console.log({res})
      setRoutines(res.data.data)
    })
    .catch(err=>{
      console.log({err})
    })
  }, [])


  return (
    <div className="App">
      <Menu />
      <Switch>
        <Route exact path="/">
          <DashBoard />
        </Route>
        <Route exact path="/schedule">
          <Calendar />
        </Route>
        <Route exact path="/goals">
          <Goals />
        </Route>
        <Route exact path="/progress">
          <Progress />
        </Route>
        <Route exact path="/my-routines">
          <MyRoutines />
        </Route>
        <Route exact path="/find-routine">
          <FindRoutine />
        </Route>
        <Route exact path="/create-routine">
          <CreateRoutine />
        </Route>
        <Route exact path="/browse-exercises">
          <BrowseExercises />
        </Route>
        

        
        <Route exact path="/drag-and-drop-play">
          <DragAndDropPlay/>
        </Route>
        <Route exact path="/drag-and-drop-play2">
          <DragAndDrop2 routines={routines}/>
        </Route>
        
      </Switch>
      <div style={{padding: '20px'}}>
        
        <pre>{JSON.stringify(routines, '' ,4)}</pre>
      </div>
    </div>
  );
}

export default App;
