import React from 'react';
import Input from './Input';
import $ from "jquery";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    };

    handleInputChange(e) {
        const target = e.target;
        switch (target.name) {
            case 'email':
                this.setState({
                    email: target.value
                });
                break;
            case 'password':
                this.setState({
                    password: target.value
                });
                break;
            default:
                console.log ( `${target.name} is unknown` );
        };
    };

    goToStart(e) {
        this.props.app.navigate('StartToDo');
        e.preventDefault();
    }

    logInUser(e) {

        if (this.refs.loginForm.reportValidity()) {
            e.preventDefault();

            let email = this.state.email;
            let password = this.state.password;

            $.ajax({
                method: 'post',
                url: 'http://localhost:8080/users/login',
                data: {email: email, password: password},
                dataType: 'json'
            }).done((data) => {
                if (data && data.isValid && data.isAllowed) {
                    this.props.app.setUserId(data.userId);
                    this.props.app.navigate('ToDoLists');
                } else {
                    console.log (this.state);
                };
            });
        };
    };

    render() {
        return (
            <form className="login-form mdc-theme--dark" ref="loginForm" onChange={ this.handleInputChange.bind(this) }>
                <h2>Authorization</h2>
                <Input type="email" name="email" placeholder="E-mail" value={this.state.email} required/>
                <Input type="password" name="password" placeholder="Password" value={this.state.password} required/>
                <button onClick={ this.logInUser.bind(this) } className="login-btn mdc-button mdc-button-primary mdc-button-raised">Log In</button>
                <button onClick={ this.goToStart.bind(this) } className="cancel-btn mdc-button mdc-button-primary mdc-button-raised">Cancel</button>
            </form>
        );
    };
}

export default LoginForm;