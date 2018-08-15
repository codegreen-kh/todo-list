import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery';

class SingleListForm extends React.Component {

  getDate() {
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if( dd < 10 ) {
      dd = '0' + dd;
    }
    if( mm < 10 ) {
      mm = '0' + mm;
    }
    let today = dd+'/'+mm+'/'+yyyy;
    return today;
  }

  render() {
    return (
      <div className="single-list-form mdc-theme--dark">
        <div className="list-info">
          <div className="list-data">
            <button className="back-to-lists"><i className="fa fa-arrow-circle-o-left"></i></button>
            <label className="list-name">to-do list name</label>
          </div>
          <div className="list-update-time">
            <label id="date" className="date"> { this.getDate() } </label>
            <label className="updated-date">last update :</label>
          </div>
          <div className="list-of-tasks">
            <div className="task">
              <label className="task-name">Some task</label>
              <button className="delete-task mdc-button mdc-button-primary mdc-button-raised">-</button>
            </div>
            <div className="task">
              <label className="task-name">Some task</label>
              <button className="delete-task mdc-button mdc-button-primary mdc-button-raised">-</button>
            </div>
            <div className="task">
              <label className="task-name">Some task</label>
              <button className="delete-task mdc-button mdc-button-primary mdc-button-raised">-</button>
            </div>
          </div>
          <div className="add-new-task mdc-textfield">
            <input type="text" className="new-task-name mdc-text-field__input" placeholder="Add new task" maxLength={27}/>
            <button className="add-new-btn mdc-button mdc-button-primary mdc-button-raised">+</button>
          </div>
        </div>
      </div>
    );
  };
}

export default SingleListForm;