import ITask from './Interfaces'

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
        <div className="container mt-5">
            <table className="table table-sm">
                <thead className='table-primary'>
                <tr>
                    <td>ID</td>
                    <td>Titel</td>
                    <td>Completed</td>
                    <td>Edit</td>
                    <td>Delete</td>
                </tr>
                </thead>
                <tbody>
                {props.tasks.map(task => {
                    return (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
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
