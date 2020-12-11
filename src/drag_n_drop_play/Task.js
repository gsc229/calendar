import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`

/* 
  Draggable has two required props - draggableId & index 
  
  Like Droppable, Draggable expexts a function as its child. The arguments to this funtion are:

  provided

*/

const Tasks = ({task, provided, snapshot}) => {
  return (
        <div
        className='task'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={{backgroundColor: snapshot.isDragging ? "lightgreen" : "white"}} 
        >
          <h4>{task.id}</h4>
          <p>{task.content}</p>
        </div>
  )
}

export default Tasks
