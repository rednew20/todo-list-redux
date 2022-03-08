import React, { useState } from 'react'
import './Modal.css'

const Modal = ({ type, modalOpen, setModalOpen, editTodo, todo }) => {
  const [taskName, setTaskName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, taskName)
    setModalOpen(false);
  }

  return (
    <div>
      {modalOpen && (
        <div className="wrapper">
          <div className="modal-container">
            <div className="closeButton">
              <button className="btn btn-close" onClick={() => setModalOpen(false)}></button>
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

export default Modal