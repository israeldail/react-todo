"use client"
import { useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<any>(null);
  const [editValue, setEditValue] = useState("");

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
            <li key={idx}>
              <div className="flex items-center">
                {/* Show item text OR input if this item is being edited */}
                {editingIndex === idx ? (
                  <input
                    className="mt-2 p-2"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    placeholder="Edit todo"
                  />
                ) : (
                  <span>{item}</span>
                )}

                {/* Edit button */}
                {editingIndex === idx ? (
                  <button
                    className="ml-4 cursor-pointer"
                    onClick={() => {
                      editTodo(item, editValue);
                      setEditingIndex(null); // Done editing
                      setEditValue(""); // Clear input
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="ml-4 cursor-pointer"
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditValue(item); // Pre-fill input with current value
                    }}
                  >
                    Edit
                  </button>
                )}

                {/* Delete button */}
                <button
                  className="ml-4 cursor-pointer"
                  onClick={() => deleteTodo(item)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
