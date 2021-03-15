import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllStudents from "./All"
import Edit from "./Edit"
import Add from "./Add"

class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/student/getAll').then(response => response.json()).then(data => this.setState({ "students": data }));
  }

  render(){
    return (
      <div className="students-wrapper">
        <Switch>
          <Route exact path='/students' component={AllStudents} />
          <Route path='/students/add' component={Add} />
          <Route path='/students/edit' component={Edit} />
        </Switch>
      </div>
    );
  }

}



export default Students;