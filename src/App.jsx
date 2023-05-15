import React, { useState } from "react";
import "./App.css";
function App() {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const [todo, setTodo] = useState([]);
  const [pending, setPending] = useState(todo.length);
  console.log(pending);
  // console.log(input);
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodo = {
      content: input,
      complete: false,
      isEdit: true,
      contentEdit: edit,
    };
    const addTodo = [...todo];
    addTodo.push(newTodo);
    setTodo([...addTodo]);
    setPending(addTodo.length);
    setInput("");
  };
  const handleEdit = (index) => {
    const editTodo = [...todo];
    editTodo[index].isEdit = !editTodo[index].isEdit;
    setEdit(editTodo[index].content);
    setTodo([...editTodo]);
  };

  const handleUpdate = (index) => {
    console.log("haha");
    const updateNewTodo = [...todo];
    updateNewTodo[index].content = edit;
    updateNewTodo[index].isEdit = !updateNewTodo[index].isEdit;
    setTodo([...updateNewTodo]);
  };

  const handleDelete = (index) => {
    const updateTodo = [...todo];
    updateTodo.splice(index, 1);
    setTodo(updateTodo);
  };

  const handleCompleted = (index) => {
    const completeTodo = [...todo];
    completeTodo[index].complete = !completeTodo[index].complete;
    const pendingTasks = completeTodo.filter((e) => !e.complete);
    setPending(pendingTasks.length);
    console.log(pending);
  };

  const handleClearAll = () => {
    setTodo([]);
  };
  return (
    <div className='App'>
      <div className='container'>
        <h1>TODOLIST APP</h1>
        <form className='main-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='input'
            placeholder='Enter new todo...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className='add'>Add</button>
        </form>
        <div className='container-todo'>
          {todo.map((e, index) =>
            e.isEdit ? (
              <div
                key={index}
                className={e.complete ? "completed" : "list-todo"}
              >
                <div className='todo-item'>{e.content}</div>
                <div className='list-btn'>
                  <button>
                    <ion-icon
                      name='create-outline'
                      onClick={() => handleEdit(index)}
                    ></ion-icon>
                  </button>
                  <button>
                    <ion-icon
                      name='trash-outline'
                      onClick={() => handleDelete(index)}
                    ></ion-icon>
                  </button>
                  <button>
                    <ion-icon
                      name='checkmark-done-outline'
                      onClick={() => handleCompleted(index)}
                    ></ion-icon>
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className={e.complete ? "completed" : "list-todo"}
              >
                {/* <div className='todo-item'>{e.content}</div> */}
                <input
                  type='text'
                  className='todo-item'
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                ></input>
                <div className='list-btn'>
                  <button>
                    <ion-icon
                      name='sync-outline'
                      onClick={() => handleUpdate(index)}
                    ></ion-icon>
                  </button>
                  <button>
                    <ion-icon
                      name='trash-outline'
                      onClick={handleDelete}
                    ></ion-icon>
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <div className='total list-todo'>
          <div className='todo-item'>You have {pending} pending task</div>
          <button className='btn-clear' onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
