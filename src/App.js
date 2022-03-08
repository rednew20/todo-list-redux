import './App.css';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'
import TodoList from './components/TodoList';
import { useState } from 'react';
import Modal from './components/Modal/Modal';

function App() {
  const [todoName, setTodoName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: 'Groceries',
      tasks: [
        {
          taskid: 1,
          name: 'buy fruit',
          complete: true
        },
        {
          taskid: 2,
          name: 'need meet',
          complete: true
        }
      ]
    },
    {
      id: 2,
      text: 'Projects',
      tasks: [
        {
          taskid: 1,
          name: 'Create hanlders',
          complete: false
        },
        {
          taskid: 2,
          name: 'Create CSS styles',
          complete: false
        }
      ]
    }
  ]);

  /* TODO functions*/
  const onSubmitTodo = (e) => {
    e.preventDefault();
    if (!todoName) {
      alert('Please enter a Name for the list.')
      return;
    }
    addTodoList(todoName)
    setTodoName('');
  }

  const addTodoList = (list) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newList = { id, text: list, tasks: [] }
    setTodoList([...todoList, newList]);
  }

  const deleteTodoList = (id) => {
    //console.log('delete todo=' + id)
    const newTodos = todoList.filter(todo => todo.id !== id);
    setTodoList(newTodos);
  }

  const editTodo = (todoid, todoName) => {
    const newTodos = todoList.map(todo => {
      if (todo.id === todoid) {
        return { ...todo, text: todoName }
      }
      return todo;

    })
    console.log(newTodos)
    setTodoList(newTodos)
  }
  /* Tasks functions*/
  const addTask = (todoId, taksName) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { taskid: id, name: taksName }
    const newTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        //spread todo, and on the current  todo tasks add newTask
        return { ...todo, tasks: [...todo.tasks, newTask] }
      }
      return todo;
    })

    setTodoList(newTodos)
  }
  const editTask = (todoId, taskId, todoName) => {
    const newTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        const newtasks = todo.tasks.map(task => {
          if (task.taskid === taskId) {
            return { ...task, name: todoName }
          }
          return task
        })
        return { ...todo, tasks: newtasks }
      }
      return todo;
    })
    //console.log(newTodos)
    setTodoList(newTodos)
  }


  const onCompleteTask = (todoId, taskId) => {  // Toggle Complete task
    console.log('completed')
    const newTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        const newtasks = todo.tasks.map(task => {
          if (task.taskid === taskId) {
            return { ...task, complete: !task.complete }
          }
          return task
        })
        return { ...todo, tasks: newtasks }
      }
      return todo;
    })
    //console.log(newTodos);
    setTodoList(newTodos)
  }
  const onDeleteTask = (todoId, taskId) => {
    const updateTodos = todoList.map(todo => {
      if (todo.id === todoId) {
        // spread todos, the todo.tasks will be filterd, when task has tasksid diff than task clicked
        return { ...todo, tasks: (todo.tasks.filter(task => task.taskid !== taskId)) }
      }
      return todo;
    })
    //const todos = todoList.filter((todo) => !todo.id)
    setTodoList(updateTodos)
  }

  return (
    <BrowserRouter>
      <section>
        <nav className="navbar navbar-light mb-3" style={{ 'background': '#e3f2fd' }}>
          <div className="container-fluid">
            <Link className="navbar-brand h1" to="/">ToDo's Tracker</Link>
          </div>
        </nav>
        <div className="container-lg align-items-center w-100 pt-5">
          <form onSubmit={onSubmitTodo} className="row">
            <div className="col-6 mb-3">
              <input className="form-control" type="text" id="todoName" placeholder="Todo Name" onChange={(e) => setTodoName(e.target.value)} value={todoName} />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3"> <i className="fa-solid fa-circle-plus"></i> Add </button>
            </div>
          </form>
        </div>
        <div className='container-md w-75'>
          <div className="row row-cols-5 pt-5">
            {todoList.map((todos) => (
              <div key={todos.id} className="col p-2">
                <div className="card border-dark">
                  <div className="card-header text-white bg-dark bg-gradient mb-3">
                    <Link to={`/todolist-${todos.id}`} >{todos.text} </Link>
                  </div>
                  <div className="card-body">
                    <span>
                      <i className="fa-solid fa-pen-to-square" onClick={() => setModalOpen(true)}></i> <i className="fa-solid fa-trash" onClick={() => deleteTodoList(todos.id)}></i>
                    </span>
                  </div>
                </div>
                <Modal type="todo" modalOpen={modalOpen} setModalOpen={setModalOpen} editTodo={editTodo} todo={todos} />
              </div>
            ))}
          </div>
        </div>
        <Routes>
          <Route key="0" exact path="/" element={<nav></nav>} />
          {todoList.map((todos) => (
            <Route key={todos.id} path={`/todolist-${todos.id}`} element={
              <TodoList id={todos.id}
                name={todos.text}
                tasks={todos.tasks}
                onDelete={onDeleteTask}
                addTask={addTask}
                onCompleteTask={onCompleteTask}
                editTask={editTask}
              />
            } />
          ))}
          <Route key="0" path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </BrowserRouter>

  );
}

export default App;