import React, {useState, useEffect, useRef} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {weekConstructor} from '../helpers/weekConstructor'
import {onDragEnd} from '../helpers/routineWeekHelpers'
import {useWindowSize} from '../../custom_hooks/useWindowSize'
import RoutineExercise from './RoutineExercise'



const RoutinesWeekDnD = ({weekData}) => {
  
  const size = useWindowSize()

  const [columns, setColumns] = useState(weekConstructor(weekData))
  console.log({columns}, {objeEntries: Object.entries(columns)})

  

  useEffect(() => {  
    setColumns(weekConstructor(weekData))
  }, [weekData])

  

  return (
    <div className='container-fluid' style={{height: '100%', border: '1px solid red'}}>
      <p>height: {size.height} width: {size.width}</p>
      <div className='row' style={{border: '1px solid greenyellow', display: 'flex', justifyContent: 'space-between'}}>
        <DragDropContext
          onDragEnd={ result=> onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            
            return(
              <div style={{backgroundColor: 'orangered',  margin: '2px', width: '13vw'}}>                
                  <h4 style={{fontSize: '2vw', border: '1px solid red', width: 'fit-content'}}>{column.name}</h4>
                  <i style={{fontSize: '2vw'}} className="fas fa-pen"></i>
                    <Droppable
                      key={id}
                      droppableId={id}
                    >
                      {(provided, snapshot) => {
                        return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver ? "lightblue" : "lightgray", 
                            padding: '4px',
                            width: '100%',
                            height: 'fit-content',
                            minHeight: '100px',
                            marginRight: '20px'
                      
                        }}
                        >
                          
                          {column.items.map((item, index) => {
                            return(
                              <Draggable
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return(
                                    <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      cursor: 'grab',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
                                      ...provided.draggableProps.style
                                    }}
                                    >
                                      <RoutineExercise routine_exercise={item} />
                                    </div>
                                  )
                                }}
                              </Draggable>
                            )
                          })}
        
                        {provided.placeholder}
                        </div>)
                      }}
                    </Droppable>
                 
                
              </div>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default RoutinesWeekDnD
