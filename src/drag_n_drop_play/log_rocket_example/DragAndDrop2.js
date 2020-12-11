import React, {useState} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import uuid from 'uuid/dist/v4'


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

console.log({columnsFromBackEnd})
console.log("object entries columnsFromBackEnd", Object.entries(columnsFromBackEnd))

const onDragEnd = (result, columns, setColumns) => {
  const {destination, source} = result

  if(!destination) return;

  if(
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ){
    return
  }

  if(source.droppableId !== destination.droppableId){
    // Move the item from the source to the destination in the proper place in the destination
    // items array
    const sourceColumn = columns.find(column => column.id === source.droppableId)
    const destinationColumn = columns.find(column => column.id === destination.droppableId)
    const sourceItems = [...sourceColumn.items]
    const destinationItems = [...destinationColumn.items]
    sourceItems.splice()


  } else{
    // Move the item to the new index in the array
  }

}


const DragAndDrop2 = () => {

  const [columns, setColumns] = useState(columnsFromBackEnd)
  console.log({columns}, {objeEntries: Object.entries(columns)})
  
  return (
    <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
      <DragDropContext
        onDragEnd={result=> console.log({result})}
      >
        {Object.entries(columns).map(([id, column]) => {
          
          return(
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
                    minHeight: '700px',
                    marginRight: '20px'
              
                }}
                >
                  <h4>{column.name}</h4>
                  {column.items.map((item, index) => {
                    return(
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
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
                              {item.content}
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
          )
        })}
      </DragDropContext>
    </div>
  )
}

export default DragAndDrop2
