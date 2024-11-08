import React, { useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState(['eat', 'sleep', 'code']);
    const [newTask, setNewTask] = useState('');

    // Handle input change
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add a new task to the list
    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask('');
        }
    }

    // Delete a task by its index
    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    // Move a task up by swapping with the previous task
    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    // Move a task down by swapping with the next task
    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>

            <div>
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button
                    className="add-button"
                    onClick={addTask}
                >
                    Add
                </button>
            </div>

            <ol>
                {tasks.map((task, index) => (
                    <li key={`${task}-${index}`}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            ☝️
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            👇
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
