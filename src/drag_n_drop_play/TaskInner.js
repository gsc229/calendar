import React from 'react'

const TaskInner = ({snapshot, provided, task}) => {
  return (
    <div
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    isDragging={snapshot.isDragging}
    className='task'
    style={{backgroundColor: snapshot.isDragging ? "lightgreen" : "white"}}>
      <h4>{task.id}</h4>
      <p>{task.content}</p>
    </div>
  )
}

export default TaskInner
