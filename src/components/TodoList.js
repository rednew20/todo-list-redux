import React from 'react'
import Tasks from './Tasks'
import { useState } from 'react';


const TodoList = ({ id, name, tasks, onDelete, addTask, onCompleteTask, editTask }) => {
  const [newTask, setNewTask] = useState('');
  //const [taskList, setTaskList] = useState(tasks)

  //console.log(tasks)

  /** */
  const onSubmit = (e) => {
    e.preventDefault();
    if (!newTask) {
      alert('Please enter a Name for the task.')
      return;
    }
    addTask(id, newTask)
    setNewTask('');
  }



  return (
    <div className="glass container-md mb-5 p-3 w-75">
      <div className="">
        <span className="Lead">Add Task to <b>{name}</b> </span>
        <form onSubmit={onSubmit} className="row align-content-center">
          <div className="col-6 mb-3">
            <input type="text" className="form-control" name="taskName" onChange={(e) => setNewTask(e.target.value)} value={newTask} />
          </div>
          <div className="col-6 mb-3">
            <button type="submit" className='btn btn-primary' >Add Task</button>
          </div>
        </form>
      </div>
      <Tasks className="container" todoId={id} tasks={tasks} onDelete={onDelete} onCompleteTask={onCompleteTask} editTask={editTask} />

    </div>
  )
}

export default TodoList