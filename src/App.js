import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import StartToDo from './components/StartToDo';
import ToDoLists from './components/ToDoLists';

class App extends Component {

    constructor(props) {
        super(props);

        this.navigate = this.navigate.bind(this);

        this.state = { page: 'StartToDo', userId: null };
    }

    navigate( page ) {
        this.setState({
            page: page
        });
    };

    setUserId( userId ) {
        this.setState({
            userId: userId
        });
    };

    render() {
        let result;
        switch( this.state.page ) {
            case 'LoginForm':
                result = <div className="App" id="app-container">
                    < LoginForm app = {this} />
                </div>
                break;
            case 'RegistrationForm':
                result = <div className="App" id="app-container">
                    <RegistrationForm app = {this} />
                </div>
                break;
            case 'ToDoLists':
                result = <div className="App" id="app-container">
                    <ToDoLists app = {this} />
                </div>
                break;
            case 'StartToDo':
            default:
                result = <div className="App" id="app-container">
                    <StartToDo app = {this} />
                </div>
                break;
        };
        return result;
    }
};

export default App;
