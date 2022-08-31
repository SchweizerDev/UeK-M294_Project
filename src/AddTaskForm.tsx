import React, {useState} from 'react';
import ITask from './Interfaces'

export interface IProps {
    add: (newItem: ITask) => void;
}

const initTask = {"title": "", "id": 0, "completed": false};

function AddTaskForm(props: IProps) {
    const [formValue, setFormValue] = useState(initTask);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValue({...formValue, [name]: value});
    };

    function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.add(formValue);
    }

    return (
        <div className="addTask">
            <div className="container">
                <p><br/></p>
                <h2>Add new Task</h2>
                <div>
                    <form className="formAdd" onSubmit={onFormSubmit}>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Please enter a Task"
                            name="title"
                            value={formValue.title}
                            onChange={onInputChange}
                            required
                        />
                        <br/>
                        <button className="bi bi-arrow-return-left btn btn-success"> Add new Task</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTaskForm;