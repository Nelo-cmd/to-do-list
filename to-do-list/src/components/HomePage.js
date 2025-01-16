import "../App.css";
import React, { useState, useEffect } from "react";

function HomePage() {
  //to hold the tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  //to get the tasks for the local storage. Note: the '[]' is a dependency. sort of like an event listener, like it waits for a change in whatever is in that bracket.
  useEffect(() => {
    const storedtasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedtasks) {
      setTasks(storedtasks);
    }
  }, []);

  //to store tasks in local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //this is to handle the adding of the task to local storage on button click.
  const HandleAddTask = (event) => {
    event.preventDefault();
    if (taskInput.trim() <= 7)
      return <p>text should be more than 7 characters</p>; // If the input field is less than 7, tell the user
    setTasks(...tasks, taskInput);
    setTaskInput("");
  };

  const HandleDeleteTask = (event, index) => {
    event.preventDefault();
    const updatedTasks = tasks.filter((_, i) => i !== index); // Create a new array without the deleted task
    setTasks(updatedTasks); // Update the tasks state
  };

  return (
    <>
      <></>
      <form className="add_task">
        <input
          className="task_input"
          type="Textbox"
          placeholder="Add Task Here"
        ></input>
        <button type="submit" onClick={HandleAddTask}>
          Add Task
        </button>
      </form>
    </>
  );
}

export default HomePage;
