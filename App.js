import React, { useState } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState([
    { name: "To Do", tasks: [] },
    { name: "In Progress", tasks: [] },
    { name: "Done", tasks: [] },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAddTask = (columnIndex) => {
    if (newTask.trim() === "") {
      return;
    }

    const newColumns = [...columns];
    newColumns[columnIndex].tasks.push({
      id: new Date().getTime(),
      text: newTask,
      priority: "",
      deadline: "",
    });

    setColumns(newColumns);
    setNewTask("");
  };

  const handleDeleteTask = (columnIndex, taskId) => {
    const newColumns = [...columns];
    newColumns[columnIndex].tasks = newColumns[columnIndex].tasks.filter(
      (task) => task.id !== taskId
    );

    setColumns(newColumns);
  };
  const handleEditTask = (columnIndex, taskId) => {
    const task = columns[columnIndex].tasks.find((task) => task.id === taskId);
    setEditedTask(task.text);
    setEditMode(true);
  };

  const handleSaveEdit = (columnIndex, taskId) => {
    const newColumns = [...columns];
    const taskIndex = newColumns[columnIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    newColumns[columnIndex].tasks[taskIndex].text = editedTask;
    setColumns(newColumns);
    setEditedTask("");
    setEditMode(false);
  };

  const handleMoveTask = (sourceColumnIndex, targetColumnIndex, taskId) => {
    const sourceColumn = columns[sourceColumnIndex];
    const targetColumn = columns[targetColumnIndex];

    const task = sourceColumn.tasks.find((task) => task.id === taskId);

    const newSourceTasks = sourceColumn.tasks.filter(
      (task) => task.id !== taskId
    );

    const newTargetTasks = [...targetColumn.tasks, task];

    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = {
      ...sourceColumn,
      tasks: newSourceTasks,
    };
    newColumns[targetColumnIndex] = {
      ...targetColumn,
      tasks: newTargetTasks,
    };

    setColumns(newColumns);
  };

  return (
    <div className="App">
      <h1>Trello-like App</h1>
      <div className="columns">
        {columns.map((column, columnIndex) => (
          <div className="column" key={column.name}>
            <h2>{column.name}</h2>
            <div className="tasks">
              {column.tasks.map((task) => (
                <div className="task" key={task.id}>
                  <div>{task.text}</div>
                  <div className="buttons">
                    <button onClick={() => handleDeleteTask(columnIndex, task.id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEditTask(columnIndex, task.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleMoveTask(columnIndex, columnIndex - 1, task.id)} disabled={columnIndex === 0}>
                      Move Left
                    </button>
                    <button onClick={() => handleMoveTask(columnIndex, columnIndex + 1, task.id)} disabled={columnIndex === columns.length - 1}>
                      Move Right
                    </button>
                  </div>
                  {editMode && (
                    <div className="edit-task">
                      <input
                        type="text"
                        value={editedTask}
                        onChange={(event) => setEditedTask(event.target.value)}
                      />
                      <button onClick={() => handleSaveEdit(columnIndex, task.id)}>Save</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="add-task">
              <input
                type="text"
                placeholder="Add a task"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
              <button onClick={() => handleAddTask(columnIndex)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

