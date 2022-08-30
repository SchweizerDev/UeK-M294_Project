import React, {useState} from 'react';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from "./EditTaskForm";
import axios from "axios";


const defaultTasks: Array<ITask> = [
    {"title": "Feed the cats", "completed": false, "id": 1},
    {"title": "Test the software", "completed": false, "id": 2},
];

const emptyTask: ITask = {"title": "", "completed": false, "id": 0};

const baseURL = "http://localhost:3000/";

function App() {
    const [tasks, setTasks] = useState(defaultTasks);
    const [taskToEdit, setTaskToEdit] = useState(emptyTask);

    function addTask(task: ITask) {
        let highestId = 0;
        for (let i = 0; i < tasks.length; i++) {
            let currentId = tasks[i].id ?? 0;
            if (currentId > highestId) {
                highestId = currentId;
            }
        }
        task.id = highestId + 1;
        axios
            .post(baseURL + 'tasks', task)
            .then((response) => {
                console.log(response);
            });
        setTasks([...tasks, task]);
    }

    function deleteTask(taskToDelete: ITask) {
        let tasksWithoutDeleted = tasks.filter(currentTask => taskToDelete.id !== currentTask.id);
        setTasks(tasksWithoutDeleted);
    }

    function setEditTask(task: ITask) {
        setTaskToEdit(task);
    }

    function editTask(task: ITask) {
        setTasks(tasks.map(i => (i.id === task.id ? task : i)));
    }

    //Get Request
    React.useEffect(() => {
        axios.get(baseURL + 'tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    if (!tasks) return null;

    return (
        <div className="App">
            <TaskList tasks={tasks} deleteTask={deleteTask} setTaskToEdit={setEditTask}></TaskList>
            <EditTaskForm edit={editTask} taskToEdit={taskToEdit}></EditTaskForm>
            <AddTaskForm add={addTask}></AddTaskForm>
        </div>
    );
}

export default App;
