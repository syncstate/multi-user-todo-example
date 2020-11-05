import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { useDoc } from "@syncstate/react";
function App() {
  const todoPath = "/todos";
  const [todos, setTodos] = useDoc(todoPath);
  const [input, setInput] = useState("");

  const keyGenerator = () => "_" + Math.random().toString(36).substr(2, 9);
  const addTodo = (todoItem) => {
    setTodos((todos) => {
      let id = keyGenerator();
      todos.push({
        id: id,
        caption: todoItem,
        completed: false,
      });
      document.getElementsByClassName("input-todo")[0].value = "";
    });
  };

  const todoList = todos.map((todo, index) => {
    return <Todo key={index} todoPath={todoPath + "/" + index} />;
  });
  return (
    <div className="main-app">
      <div className="todo-app">
        <h2>Multi User Todo App</h2>
        <br></br>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo(input);
            setInput("");
          }}
        >
          <input
            type="text"
            className="input-todo"
            placeholder="What's on your mind?"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          ></input>
        </form>
        {todoList}
      </div>
    </div>
  );
}

export default App;
