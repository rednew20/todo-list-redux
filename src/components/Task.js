import React, { useEffect, useState } from 'react'

const Task = ({ todoId, task, edit, onEdit }) => {

  const [newName, setNewName] = useState();
  //Set Name when task is edited
  useEffect(() => setNewName(edit.taskName), [edit.taskName])

  const onSubmit = (e) => {
    e.preventDefault();
    if (!task.name) {
      alert('Please enter a Name for the task.')
      return;
    }
    onEdit(task.taskid, newName)
    setNewName('')
  }

  const cancelEdit = () => {
    edit = {
      todoId: null,
      taskId: null,
      taskName: setNewName(edit.taskName)
    }
  }

  const editTemplate = (
    <div>
      <form onSubmit={onSubmit} className="row align-content-center">
        <div className="col-6 mb-2 justify-content-center">
          <input type="text" className="form-control" name="taskName" onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div className="col-5 mb-2 align-content-center justify-content-center">
          <button type="submit" className='btn btn-primary btn-sm me-1' >Update</button>
          <button type="submit" className='btn btn-secondary btn-sm' onClick={(e) => cancelEdit(todoId, task.taskid)} >Cancel</button>
        </div>
      </form>
    </div>)

  const viewTemplate = (task.complete ? <span style={{ textDecoration: 'line-through' }}>{task.name}</span> : <span>{task.name}</span>)

  return (
    <span>
      {(task.taskid === edit.taskId && todoId === edit.todoId) ? editTemplate : viewTemplate}
    </span>
  )
}

export default Task