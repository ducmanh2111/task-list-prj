import React from "react";
import Task from "./Task";

export default function Tasks() {
  const tasks = ['task 1', 'task 2', 'task 3'];

  return (
    <div className="container">
      <br />
      <br />
      <h2>List Task</h2>
      <h2>Name of task</h2>
      {tasks.map(name => 
        (<Task name={name} key={name} />)
      )}
    </div>
  );
}
