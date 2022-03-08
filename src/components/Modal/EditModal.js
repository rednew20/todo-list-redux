import React, { useState } from 'react'
import './Modal.css'

const EditModal = ({ type, modalOpen, setModalOpen, editTodo, todo }) => {
  const [taskName, setTaskName] = useState();

  //console.log(todo)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taskName)
    editTodo(todo.id, taskName)
    setModalOpen(false);
  }

  return (
    <div>
      {modalOpen && (
        <div className="wrapper">
          <div className="modal-container">
            <div className="closeButton">
              <i className="fa-solid fa-rectangle-xmark" onClick={() => setModalOpen(false)}></i>
            </div>
            <form className="modal-form" onSubmit={(e) => handleSubmit(e)}>
              <h1 className="formTitle">Edit {type === 'todo' ? 'ToDo' : 'Task'}</h1>
              <label htmlFor='taskname'>
                Task Name
                <input type="text" id="title" onChange={(e) => setTaskName(e.target.value)} />
              </label>
              <div>
                <button type="submit" className="btn btn-primary me-2">Accept</button>
                <button type="submit" className="btn btn-secondary me-1" onClick={() => setModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditModal