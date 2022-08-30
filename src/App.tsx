import React, {useState} from 'react';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from "./EditTaskForm";


const defaultTasks: Array<ITask> = [
    {"taskDescription": "Feed the cats", "completed": false, "taskId": 1},
    {"taskDescription": "Test the software", "completed": false, "taskId": 2},
];

const emptyTask: ITask = {"taskDescription": "", "completed": false, "taskId": 0};

function App() {
    const [tasks, setTasks] = useState(defaultTasks);
    const [taskToEdit, setTaskToEdit] = useState(emptyTask);

    function addTask(task: ITask) {
        let highestId = 0;
        for (let i = 0; i < tasks.length; i++) {
            let currentId = tasks[i].taskId ?? 0;
            if (currentId > highestId) {
                highestId = currentId;
            }
        }
        task.taskId = highestId + 1;
        setTasks([...tasks, task]);
    }

    function deleteTask(taskToDelete: ITask) {
        let tasksWithoutDeleted = tasks.filter(currentTask => taskToDelete.taskId !== currentTask.taskId);
        setTasks(tasksWithoutDeleted);
    }

    function setEditTask(task: ITask) {
        setTaskToEdit(task);
    }

    function editTask(task: ITask) {
        // Find correct todo item to update
        setTasks(tasks.map(i => (i.taskId === task.taskId ? task : i)));
    }

    return (
        <div className="App">
            <TaskList tasks={tasks} deleteTask={deleteTask} setTaskToEdit={setEditTask}></TaskList>
            <EditTaskForm edit={editTask} taskToEdit={taskToEdit}></EditTaskForm>
            <AddTaskForm add={addTask}></AddTaskForm>
        </div>
    );
}

export default App;
