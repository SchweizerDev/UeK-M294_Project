import ITask from './Interfaces'
import React from "react";

export interface IProps {
    tasks: ITask[];
    deleteTask: (task: ITask) => void;
    setTaskToEdit: (task: ITask) => void;
}

function TaskList(props: IProps) {

    function removeTask(task: ITask) {
        props.deleteTask(task);
    }

    function editTask(task: ITask) {
        props.setTaskToEdit(task);
    }

    return (
        <div className="container m-5">
            <table className="table table-sm">
                <thead className='table-primary'>
                <tr>
                    <td><i>ID</i></td>
                    <td><i>Titel</i></td>
                    <td><i>Completed</i></td>
                    <td><i>Edit</i></td>
                    <td><i>Delete</i></td>
                </tr>
                </thead>
                <tbody>
                {props.tasks.map(task => {
                    return (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td><strong>{task.title}</strong></td>
                            <td>{task.completed ? "Yes" : "No"}</td>
                            <td>
                                <button className="btn btn-secondary bi bi-pencil-fill"
                                        onClick={() => editTask(task)}> Edit
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-danger bi bi-trash3-fill"
                                        onClick={() => removeTask(task)}> Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
