import React from 'react'
import styled from 'styled-components'
import {Droppable, Draggable} from 'react-beautiful-dnd'
import Task from './Task'


const TaskList = styled.div`
  padding: 8px
`
const Column = ({column, tasks}) => {

  return (
    <div className="task-list-container container">
      <h3 className="title" style={{padding: '8px'}}>{column.title}</h3>
      {/* 
        Droppable expects it's child to be a function that returns a react component. 
        One reason the render props pattern is used, is because rbdnd does not have to create any DOM nodes for you. 
        You create you components the way you want to and rbdnd latches into your existing structure. 

        Need to spread in the provided.droppableProps objecct into the style-components element 
        A styled-components has a callback function called innerRef and we can use it to pass provided.innerRef
        !!innerRef is a function used to supply a DOM node of your component to rbdnd

        (note on above paragraph: changed innerRef to just ref following the example in the documentation and it worked)

        provided.placeholder is a React element used to create more space in a droppable during a drag when it is needed.
        the placeholder needs to be added as a child of the component that we have designated ast the 'droppable' (TaskList)
      */}
      <Droppable
        droppableId={column.id} // Droppables have one required prop - a droppableId 
      >
        {(provided) => (
          <div
          className='task-list'
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {tasks.map((task, index) => 
            
            <Draggable 
            key={task.id} 
            draggableId={task.id}
            index={index}>

              {(provided, snapshot) => {
                console.log({tasks})
                return(<Task task={task} provided={provided} snapshot={snapshot}  />)
              }}

            </Draggable>)}
            {provided.placeholder} 
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column
