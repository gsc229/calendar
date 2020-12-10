import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

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

const Tasks = ({task, index}) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}
    >
      {(provided) => (
        <div 
        className='task'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <h4>{task.id}</h4>
          <p>{task.content}</p>
        </div>
      )}
    </Draggable>
  )
}

export default Tasks
