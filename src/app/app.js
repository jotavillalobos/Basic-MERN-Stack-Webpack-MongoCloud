import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();

        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        }
    }
    componentDidMount = () => {
        this.getTasks();
    }
    getTasks = async () => {
        const getTasks = await fetch('/api/tasks');
        const response = await getTasks.json();
        this.setState({
            tasks: response.task
        });
    }
    getTaskById = async (id) => {
        const getTaskById = await fetch(`/api/tasks/${id}`);
        const response = await getTaskById.json();
        return response;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleAddTask = async (e) => {
        e.preventDefault();
        const { _id, title, description } = this.state;
        const newTask = {
            _id,
            title,
            description
        }
        const uri = _id ? `/api/tasks/${_id}` : '/api/tasks'
        const postNewTask = await fetch(uri, {
            method: _id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        const response = await postNewTask.json();

        M.toast({ html: 'Task saved' });
        
        this.setState({
            _id: '',
            title: '',
            description: ''
        })
        this.getTasks();
    }
    handleEditTask = async (id) => {
        const response = await this.getTaskById(id);
        this.setState({
            _id: response._id,
            title: response.title,
            description: response.description
        });
    }
    handleDeleteTask = async (id) => {
        if (!confirm('really???')) {
            return;
        }

        const deleteTaskById = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const response = await deleteTaskById.json();

        M.toast({ html: 'Task deleted' });
        this.getTasks();
    }

    render() {
        const { title, description, tasks } = this.state;
        const taskResult = tasks.map(task => {
            return (
                <tr key={task._id}>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                        <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.handleEditTask(task._id)}>
                            <i className="material-icons">edit</i>
                        </button>
                        <button className="btn light-blue darken-4" onClick={() => this.handleDeleteTask(task._id)}>
                            <i className="material-icons">delete</i>
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo">MERN Stack Skydive Logbook</a>
                    </div>
                </nav> 

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.handleAddTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="add task title" onChange={this.handleChange} value={title} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" className="materialize-textarea" placeholder="task description" onChange={this.handleChange} value={description} >
                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        taskResult
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;