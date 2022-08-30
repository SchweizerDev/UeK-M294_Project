import ITask from './Interfaces'

export interface IProps {
    tasks: ITask[];
    deleteTask: (task:ITask) => void;
    editTask: (task: ITask) => void;
}

function TaskList(props: IProps) {

    function removeTask(task: ITask) {
        props.deleteTask(task);
    }

    function editTask(task: ITask) {
        props.editTask(task);
    }

    return (
        <div className="list">
            <table>
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Titel</td>
                    <td>Completed</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>
                {props.tasks.map(task => {
                    return (
                        <tr key={task.taskId}>
                            <td>{task.taskId}</td>
                            <td>{task.taskDescription}</td>
                            <td>{task.completed}</td>
                            <td>
                                <button onClick={() => editTask(task)}>Edit</button>
                                <button onClick={() => removeTask(task)}>Delete</button>
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
