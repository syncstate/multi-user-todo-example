import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { useDoc } from "@syncstate/react";
function App() {
  const todoPath = "/todos";
  const [todos, setTodos] = useDoc(todoPath);
  const [input, setInput] = useState("");
  const getRand = () => {
    return (
      new Date().getTime().toString() + Math.floor(Math.random() * 1000000)
    );
  };
  const addTodo = (todoItem) => {
    setTodos((todos) => {
      let id = getRand();
      todos.push({
        id: id,
        caption: todoItem,
        completed: false,
      });
    });
  };

  const todoList = todos.map((todo, index) => {
    return <Todo key={todo.id} todoPath={todoPath + "/" + index} />;
  });
  return (
    <div className="App">
      <h1>Multi-User Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo(input);
          setInput("");
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
      {todoList}
    </div>
  );
}

export default App;
