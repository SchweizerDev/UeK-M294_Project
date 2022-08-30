import React, {useEffect, useState} from 'react';
import ITask from './Interfaces'

export interface IProps {
    edit: (editTask: ITask) => void;
    taskToEdit: ITask;
}

const initTask = {"title": "", "id": 0, "completed": false};

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
            <h2>Edit Task {props.taskToEdit?.id}</h2>
            <div>
            <form className="formEdit" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    placeholder="Please enter a Task"
                    name="title"
                    value={formValue.title}
                    className="form-control"
                    onChange={onInputChange}
                    required
                />
                <br/>
                <button className="bi-pencil-fill btn btn-secondary bi" id="editButton"> Save</button>
            </form>
            </div>
            </div>
        </div>
    );
}

export default EditTaskForm;