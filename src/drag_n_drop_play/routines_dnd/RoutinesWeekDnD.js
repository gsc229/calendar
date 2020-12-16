import React, {useState, useEffect} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {weekConstructor} from '../helpers/weekConstructor'
import {upadateRoutineExercise, getWeek} from '../helpers/routineWeekHelpers'
import uuid from 'uuid/dist/v4'
import RoutineExercise from './RoutineExercise'


const itemsFromBackend = [
  {id: uuid(), content: 'First task'},
  {id: uuid(), content: 'Second task'}
]

const itemsFromBackend2 = [
  {id: uuid(), content: 'Third task'},
  {id: uuid(), content: 'Fourth task'}
]

const columnsFromBackEnd = 
  {
    [uuid()]:{
      id: uuid(),
      name: 'Monday',
      items: itemsFromBackend
    },
    [uuid()]:{
      id: uuid(), 
      name: 'Tuesday',
      items: itemsFromBackend2
    }
  }



const onDragEnd = async (result, columns, setColumns) => {
  const {destination, source} = result

  console.log({destination, source})

  if(!destination) return;

  if(
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ){
    return
  }

  if(source.droppableId !== destination.droppableId){
    // Move the item from the source to the destination in the proper place in the destination
    // items array --- dropabableIds are 'U', 'M', 'T', 'W', 'R', 'F'
    const sourceColumn = columns[source.droppableId] 
    const destinationColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destinationItems = [...destinationColumn.items]
    let [removed] = sourceItems.splice(source.index, 1)
    //alert(`${JSON.stringify(removed)}`)
    /* 
    removed = await upadateRoutineExercise(removed, destination.droppableId)
    console.log({removed}) */
    removed.day = destination.droppableId
    destinationItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destinationColumn,
        items: destinationItems
      }
    })
    upadateRoutineExercise(removed._id, {day: removed.day})
    .then(response => {
      if(!response.success){
        // if api call fails, take the item back out of the destication and put back in the source
        alert(`Sorry there was a problem with the server. We couldn't save your changes at this time.\nerror_message: ${response.error_message}`)
        const [removed] = destinationItems.splice(destination.index, 1)
        removed.day = source.droppableId
        sourceItems.splice(source.index, 0, removed)
        setColumns({
          ...columns,
          [source.droppableId]:{
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]:{
            ...destinationColumn,
            items: destinationItems
          }
        })
      }
    })
    
  } else{
    // Move the item to the new index in the array
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }

}


const RoutinesWeekDnD = ({weekData}) => {
  

  const [columns, setColumns] = useState(weekConstructor(weekData))
  console.log({columns}, {objeEntries: Object.entries(columns)})

  useEffect(() => {
    
    setColumns(weekConstructor(weekData))

  }, [weekData])

  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext
        onDragEnd={ result=> onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([id, column]) => {
          
          return(
            <div>
              <h4 style={{border: '1px solid red', width: 'fit-content'}}>{column.name}</h4>
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
                      width: '250px',
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
  )
}

export default RoutinesWeekDnD
