import React, {useState} from 'react';
import './App.css';
import TaskList from './TaskList';
import ITask from './Interfaces';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from "./EditTaskForm";
import axios from "axios";
import Login from "./Login";


const defaultTasks: Array<ITask> = [
    {"title": "Feed the cats", "completed": false, "id": 1},
    {"title": "Test the software", "completed": false, "id": 2},
];

const emptyTask: ITask = {"title": "", "completed": false, "id": 0};

const baseURL = "http://localhost:3000/";

function App() {
    const [tasks, setTasks] = useState(defaultTasks);
    const [taskToEdit, setTaskToEdit] = useState(emptyTask);
    const [token, setToken] = useState("");

    function updateToken(token: string) {
        setToken(token);
    }

    function addTask(task: ITask) {
        let highestId = 0;
        for (let i = 0; i < tasks.length; i++) {
            let currentId = tasks[i].id ?? 0;
            if (currentId > highestId) {
                highestId = currentId;
            }
        }
        task.id = highestId + 1;
        axios.post(baseURL + 'auth/jwt/tasks', {"title": task.title}, {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                console.log(response);
                setTasks([...tasks, response.data]);
            });
    }


    function deleteTask(taskToDelete: ITask) {
        let tasksWithoutDeleted = tasks.filter(currentTask => taskToDelete.id !== currentTask.id);
        axios.delete(baseURL + "auth/jwt/task/" + taskToDelete.id, {headers: {'Authorization': `Bearer ${token}`}}).then(() => {
            setTasks(tasksWithoutDeleted)
        });
        setTasks(tasksWithoutDeleted);
        alert("Task '" + taskToDelete.title + "' deleted.")
    }

    function setEditTask(task: ITask) {
        setTaskToEdit(task);
    }

    function editTask(task: ITask) {
        axios.put(baseURL + 'auth/jwt/tasks', task, {headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
            console.log(response)
        });
        setTasks(tasks.map(i => (i.id === task.id ? task : i)));
    }

    //Get Request
    React.useEffect(() => {
        if (token !== "") {
            axios.get(baseURL + 'auth/jwt/tasks', {headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
                setTasks(response.data);
            });
        }
    }, [token]);

    if (!tasks) return null;

    if (token === "") {
        return <Login setLoginToken={updateToken} email={""} password={""}></Login>
    } else {
        return (
            <div className="App">
                <TaskList tasks={tasks} deleteTask={deleteTask} setTaskToEdit={setEditTask}></TaskList>
                <EditTaskForm edit={editTask} taskToEdit={taskToEdit}></EditTaskForm>
                <AddTaskForm add={addTask}></AddTaskForm>
            </div>
        );
    }
}

export default App;
