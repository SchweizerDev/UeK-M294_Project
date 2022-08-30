import React, {useEffect, useState} from 'react';
import ITask from './Interfaces'

export interface IProps {
    edit: (editTask: ITask) => void;
    taskToEdit: ITask;
}

const initTask = {"taskDescription": "", "taskId": 0, "completed": false};

function EditTaskForm(props: IProps) {
    const [formValue, setFormValue] = useState(props.taskToEdit ?? initTask);
    useEffect(() => setFormValue(props.taskToEdit), [props]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.edit(formValue);
    }

    return (
        <div className="editTask">
            <div className="container">
            <p><br/></p>
            <h2>Edit Task {props.taskToEdit?.taskId}</h2>
            <div>
            <form className="formEdit" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Please enter a Task"
                    name="taskDescription"
                    value={formValue.taskDescription}
                    className="form__field"
                    onChange={onInputChange}
                    required
                />
                <p><br/></p>
                <button className="button">Edit</button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default EditTaskForm;