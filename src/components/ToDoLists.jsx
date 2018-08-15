import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

class ToDoLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.app.state.userId,
            userName: '',
            email: '',
            tasks: [],
            name: ''
        };
        this.taskClass = ['task-name'];

        this.newTaskInputChange = this.newTaskInputChange.bind(this);
    };

    logOutUser(e) {
        this.props.app.navigate('LoginForm');
        e.preventDefault();
    };

    getUserInfo() {
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/users/',
            data: {userId: this.state.userId},
            dataType: 'json'
        }).done((data) => {
            data.map((elem, i) => {
                return this.setState({
                    userName: elem.firstName,
                    email: elem.email
                });
            });
        });
    };

    getUserTasks() {
        $.ajax({
            method: 'get',
            url: 'http://localhost:8080/tasks',
            data: {userId: this.state.userId},
            dataType: 'json'
        }).done((data) => {
            this.setState({
                tasks: data
            });
            this.createTaskList();
        });
    };

    createTaskList() {
        let taskList = this.state.tasks;
        let items = [];

        taskList.forEach((elem, i) => {

            let taskId = {'taskid': elem.id};

            if (elem.done) {
                this.taskClass.push('done');
            } else {
                this.taskClass = ['task-name'];
            };

            let classes = this.taskClass.join(' ');

            items.push(
                <div className="task" id={i} key={elem.id}>
                    <label className={classes} id={elem.id} onClick={this.updateTask.bind(this)}>{elem.name}</label>
                    <button className="delete-task mdc-button mdc-button-primary mdc-button-raised" {...taskId} onClick={ this.deleteTask.bind(this) }>-</button>
                </div>
            );
        });

        ReactDOM.render(items, document.getElementById('lists'));

    };

    newTaskInputChange(e) {
        const target = e.target;
        switch (target.name) {
            case 'newTask':
                this.setState({
                    name: target.value
                });
                break;
            default:
                console.log ( `${target.name} is unknown` );
        };
    };

    deleteTask(e) {
        e.preventDefault();

        let taskId = $(e.target).attr('taskid');

        $.ajax({
            method: 'delete',
            url: 'http://localhost:8080/tasks',
            data: {id:taskId},
            dataType: 'json'
        }).done((data)=>{
            if (data) {
                if (data.isValid) {
                    let result = this.state.tasks.filter((item, i)=>{
                        return (item.id !== taskId);
                    });
                    this.setState({
                        tasks: result
                    });

                    this.createTaskList();
                } else {
                    console.log ("task can't be delated");
                }
            };
        });
    };

    addTask(e) {
        e.preventDefault();

        if (!this.refs.ToDoLists.reportValidity()) {
            return;
        };

        let userId = this.state.userId;
        let name = this.state.name;
        let done = this.state.done;
        let order = this.state.tasks.length;

        $.ajax({
            method: 'post',
            url: 'http://localhost:8080/tasks',
            data: {userId: userId, name: name, done: done, order:order},
            dataType: 'json'
        }).done( (data) => {
            if (data) {
                if (data.isValid) {
                    this.state.tasks.push(data.task);
                    this.createTaskList();

                    this.setState({
                        name: ''
                   });

                } else {
                    console.log (data.messages);
                };
            };
        });
    };

    updateTask(e) {
        e.preventDefault();

        let targetId = (e.target.id);
        let task = null;

        this.state.tasks.forEach((item, i)=>{
            if (item.id === targetId) {
                task = item;
            };
        });

        if (task) {

            task.done = !task.done;

            $.ajax({
                method: 'post',
                url: 'http://localhost:8080/tasks',
                data: task,
                dataType: 'json'
            }).done( (data) => {
                if (data) {
                    if (data.isValid) {

                        this.createTaskList();

                    } else {
                        console.log (data.messages);
                    };
                };
            });
        } else {
            console.log (`Task with id: ${targetId} is not found.`);
        }
    };

    componentDidMount() {
        this.getUserInfo();
        this.getUserTasks();
    };

    render() {
        return (
            <form className="to-do-lists mdc-theme--dark" ref="ToDoLists" onChange={ this.newTaskInputChange.bind(this) }>
                <div className="user-info">
                    <div className="user-name-email">
                        <span className="user-name">{this.state.userName}</span>
                        <span className="user-email">{this.state.email}</span>
                    </div>
                    <div className="log-out-div">
                        <button onClick={ this.logOutUser.bind(this) } className="log-out-btn mdc-button mdc-button-primary mdc-button-raised">Log out</button>
                    </div>
                </div>
                <div className="lists" id="lists">
                </div>
                <div className="add-new-task mdc-textfield">
                    <input type="text" name="newTask" value={this.state.name} className="new-task-name mdc-text-field__input" placeholder="Add new task" maxLength={40} required/>
                    <button className="add-new-btn mdc-button mdc-button-primary mdc-button-raised" onClick={ this.addTask.bind(this) }>+</button>
                </div>
            </form>
        );
    };
}

export default ToDoLists;