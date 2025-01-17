import "../App.css";
import React, { useState, useEffect } from "react";

function HomePage() {
  //to hold the tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  //to get the tasks for the local storage. Note: the '[]' is a dependency. sort of like an event listener, like it waits for a change in whatever is in that bracket.
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

  //to store tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //this is to handle the adding of the task to local storage on button click.
  const HandleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.trim().length < 3) {
      alert("Text should be more than 7 characters");
      return;
    } // If the input field is less than 7, tell the user
    setTasks([...tasks, taskInput.trim()]);
    setTaskInput("");
  };

  const HandleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Create a new array without the deleted task
    setTasks(updatedTasks); // Update the tasks state
  };

  return (
    <>
      <></>
      <ul className="task_list">
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <input
              id="button"
              type="checkbox"
              onClick={() => HandleDeleteTask(index)}
            />
          </li>
        ))}
      </ul>

      <form id="add_task" onSubmit={HandleAddTask}>
        <input
          value={taskInput}
          id="task_input"
          type="Textbox"
          placeholder="Add Task Here"
          onChange={(event) => setTaskInput(event.target.value)}
        />
        <button id="button" type="submit">
          Add Task
        </button>
      </form>
    </>
  );
}

export default HomePage;
