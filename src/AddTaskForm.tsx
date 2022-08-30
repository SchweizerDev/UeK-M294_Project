import React, {useState} from 'react';
import ITask from './Interfaces'

export interface IProps {
    add: (newItem: ITask) => void;

}

const initTask = {"taskDescription": "", "taskId": 0, "completed": false};

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
            <p><br/></p>
            <h2>Add new Task</h2>
            <div>
            <form className="formAdd" onSubmit={onFormSubmit}>
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
                <button className="button">Add new Task</button>
            </form>
            </div>
        </div>
    );
}

export default AddTaskForm;