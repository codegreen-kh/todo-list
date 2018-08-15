import React from 'react';

class StartToDo extends React.Component {

  goToLogin(e) {
    this.props.app.navigate('LoginForm');
    e.preventDefault();
  }
  
  goToRegistration(e) {
    this.props.app.navigate('RegistrationForm');
    e.preventDefault();
  }

  render() {
    return (
      <div className="start-screen">
        <h1 className="hello-text">To-Do App</h1>
        <button onClick={ this.goToLogin.bind(this) } className="login-btn mdc-button mdc-button-primary mdc-button-raised">Log In</button>
        <button onClick={ this.goToRegistration.bind(this) } className="registration-btn mdc-button mdc-button-primary mdc-button-raised">Register</button>
      </div>
    );
  };
}

export default StartToDo;