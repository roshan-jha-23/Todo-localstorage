import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import { TodoForm } from "./components";
import TodoItems from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(todo) {
    setTodos((prevTodo) => [{ id: Date.now(), ...todo }, ...prevTodo]);
  }
  function updateTodo(id, todo) {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  function toggleComplete(id) {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) setTodos(todos);
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}
          <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo)=>(<div key={todo.id}>
              <TodoItems todo={todo} className='w-full'/>

            </div>))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
