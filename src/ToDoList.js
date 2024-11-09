import React, { useState, useEffect } from 'react';

// Define a unique key for localStorage
const STORAGE_KEY = 'my_app_tasks';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');  // Define the state for the new task

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem(STORAGE_KEY);
        console.log("Loading tasks from localStorage:", savedTasks); // Debug log
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                // Ensure the tasks are valid (i.e., an array)
                if (Array.isArray(parsedTasks)) {
                    setTasks(parsedTasks);
                }
            } catch (error) {
                console.error("Error parsing local storage data", error);
            }
        }
    }, []); // Run only once when the component mounts

    // Save tasks to localStorage whenever the tasks state changes
    useEffect(() => {
        if (tasks.length > 0) {
            console.log("Saving tasks to localStorage:", tasks); // Debug log
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        }
    }, [tasks]); // Run when tasks change

    // Handle input change
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Add a new task to the list
    function addTask() {
        if (newTask.trim() !== '') {
            setTasks(prevTasks => [...prevTasks, newTask]);
            setNewTask('');  // Clear the input after adding the task
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
                    value={newTask}  // Bind the input value to newTask state
                    onChange={handleInputChange}  // Update the newTask state when input changes
                />
                <button
                    className="add-button"
                    onClick={addTask}  // Add a new task when the button is clicked
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
