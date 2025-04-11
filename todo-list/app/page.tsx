"use client"
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const deleteTodo = (item: string) => {
    if (todo.includes(item)) {
      const updatedTodos = todo.filter((t) => t !== item);
      setTodo(updatedTodos);
    } else {
      console.log("Item not found");
    }
  };

  const editTodo = (item: string, newVal: string) => {
    const updatedTodos = todo.map((t) => (t === item ? newVal : t));
    setTodo(updatedTodos);
  };

  return (
    <div className="flex flex-col items-center">
      <p className="text-7xl">Todo list</p>
      <input className="mt-7 p-2" value={input} onChange={(e) => setInput(e.target.value)} placeholder="add todo" />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => { setTodo([...todo, input]); setInput(""); }}
      >Add todo</button>

      {/* list for todos to be output */}
      {/* TODO: Add button to delete todos */}
      {/* TODO: Add button to edit todos */}
      <ul>
        {todo.length === 0 ? (
          <li>nothing to see</li>
        ) : (
          todo.map((item, idx) => (
            <div className="flex">
              <li key={idx}>{item}</li>
              <button className="ml-7 cursor-pointer" onClick={() => deleteTodo(item)}>Delete</button>
              <button className="ml-7 cursor-pointer" onClick={() => editTodo(item, input)}>Edit</button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}
