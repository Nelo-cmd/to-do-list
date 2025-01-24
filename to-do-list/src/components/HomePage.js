import "../App.css";
import React, { useState, useEffect } from "react";

function HomePage() {
  // To hold the tasks
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [taskInput, setTaskInput] = useState(""); // To hold the new task input
  const [isEditing, setIsEditing] = useState(false); // To track if a task is being edited
  const [editIndex, setEditIndex] = useState(null); // To store the index of the task being edited
  const [editInput, setEditInput] = useState(""); // To hold the edited task input

  useEffect(() => {
    document.title = "To-do App";
  });
  // To get the tasks from local storage. Note: the '[]' is a dependency.
  // It's sort of like an event listener, waiting for changes in whatever is inside that bracket.
  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      console.log("Stored tasks:", storedTasks);
      if (storedTasks) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      setTasks([]);
    }
  }, []);

  // To store tasks in local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // This is to handle the adding of a task to local storage on button click.
  const HandleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.trim().length < 3) {
      alert("Text should be more than 3 characters"); // If the input field is less than 3, tell the user
      return;
    }
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput(""); // Clear the input field
  };

  // This is to handle the deletion of a task
  const HandleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Create a new array without the deleted task
    setTasks(updatedTasks); // Update the tasks state
  };

  // This is to handle editing a task
  const HandleEditTask = (index) => {
    setIsEditing(true); // Enable editing mode
    setEditIndex(index); // Store the index of the task being edited
    setEditInput(tasks[index]); // Populate the edit input with the current task's text
  };

  // This is to handle saving the edited task
  const HandleSaveEdit = (event) => {
    event.preventDefault();
    if (editInput.trim().length < 3) {
      alert("Edited text should be more than 3 characters"); // If the edited input is less than 3, tell the user
      return;
    }
    const updatedTasks = tasks.map((task, i) =>
      i === editIndex ? editInput.trim() : task
    ); // Update the specific task
    setTasks(updatedTasks);
    setIsEditing(false); // Exit editing mode
    setEditIndex(null); // Clear the edit index
    setEditInput(""); // Clear the edit input
  };

  // This is to handle canceling the edit process
  const HandleCancelEdit = () => {
    setIsEditing(false); // Exit editing mode
    setEditIndex(null); // Clear the edit index
    setEditInput(""); // Clear the edit input
  };

  return (
    <>
      <div id="page">
        <h1>To-Do List</h1>

        <div id="root">
          {/* Task List */}
          <ul className="task_list">
            {tasks.map((task, index) => (
              <li key={index}>
                <input
                  id="delete_button"
                  type="checkbox"
                  onClick={() => HandleDeleteTask(index)}
                />
                {task}

                <button id="edit_button" onClick={() => HandleEditTask(index)}>
                  Edit
                </button>
              </li>
            ))}
          </ul>

          <div id="forms">
            {/* Add Task Form */}
            <form id="add_task" onSubmit={HandleAddTask}>
              <input
                value={taskInput}
                id="task_input"
                type="text"
                placeholder="Add Task Here"
                onChange={(event) => setTaskInput(event.target.value)}
              />
              <button id="add_button" type="submit">
                Add Task
              </button>
            </form>

            {/* Edit Task Form (only visible during editing) */}
            {isEditing && (
              <form id="edit_task" onSubmit={HandleSaveEdit}>
                <input
                  value={editInput}
                  id="edit_input"
                  type="text"
                  placeholder="Edit Task Here"
                  onChange={(event) => setEditInput(event.target.value)}
                />
                <button id="save_button" type="submit">
                  Save
                </button>
                <button
                  id="cancel_button"
                  type="button"
                  onClick={HandleCancelEdit}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
