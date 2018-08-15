import React from 'react';
import Input from './Input';
import $ from 'jquery';

class RegistrationForm extends React.Component {

  goToStart(e) {
    this.props.app.navigate('StartToDo');
    e.preventDefault();
  }

  registerUser(e) {
    e.preventDefault();

    localStorage.clear();

    let user = {
      firstName: $('input[name="firstName"]').val().trim(),
      lastName: $('input[name="lastName"]').val().trim(),
      email: $('input[name="email"]').val().trim(),
      password: $('input[name="password"]').val()
    };

    function validate() {
      let isValid = true;

      if ( user.firstName === '' ) {
        $('input[name="firstName"]').attr("placeholder", 'First name *');
        $('input[name="firstName"]').one('click', function () {
          $('input[name="firstName"]').attr("placeholder", "First name");
        } );
        isValid = false;
      }

      if ( user.lastName === '' ) {
        $('input[name="lastName"]').attr("placeholder", "Last name *");
        $('input[name="lastName"]').one('click', function () {
          $('input[name="lastName"]').attr("placeholder", "Last name");
        } );
        isValid = false;
      }

      function validateEmail($email) {
        var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test( $email );
      }

      if( !validateEmail($('input[name="email"]').val())) {
        $('input[name="email"]').val('');
        $('input[name="email"]').attr("placeholder", "E-mail is not valid");
        $('input[name="email"]').one('click', function () {
          $('input[name="email"]').attr("placeholder", "E-mail");
        } );
        isValid = false;
      }

      if ( user.email === '' ) {
        $('input[name="email"]').attr("placeholder", "E-mail *");
        $('input[name="email"]').one('click', function () {
          $('input[name="email"]').attr("placeholder", "E-mail");
        } );
        isValid = false;
      }

      if ( user.password === '' ) {
        $('input[name="password"]').attr("placeholder", "Password *");
        $('input[name="password"]').one('click', function () {
          $('input[name="password"]').attr("placeholder", "Password");
        } );
        isValid = false;
      }
      return isValid;
    }

    if ( validate() ) {
      let that = this;

      $.ajax({
        type: "POST",
        url: 'http://localhost:8080/users',
        data: user,
        success: function (result) {
          if (result && result.isValid) {
            let email = $('input[name="email"]').val();
            console.log(email);
            localStorage.setItem('email', email);
            that.props.app.navigate('LoginForm');
          } else if (result && result.messages) {
            // to do: display messages to user
          }
        },
        error: function (result) {
        },
        dataType: 'json'
      });
    }
  }

  render() {
    return (
      <form className="signup-form mdc-theme--dark">
        <h2>Registration</h2>
        <Input type="text" name="firstName" placeholder="First name"/>
        <Input type="text" name="lastName" placeholder="Last name"/>
        <Input type="email" name="email" placeholder="E-mail"/>
        <Input type="password" name="password" placeholder="Password"/>
        <button onClick={ this.registerUser.bind(this) } className="register-btn mdc-button mdc-button-primary mdc-button-raised">Sign Up</button>
        <button onClick={ this.goToStart.bind(this) } className="cancel-btn mdc-button mdc-button-primary mdc-button-raised">Cancel</button>
      </form>
    );
  };
}

export default RegistrationForm;