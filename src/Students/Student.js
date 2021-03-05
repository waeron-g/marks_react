import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllStudents from "./All"

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
          <Route path='/students/add' component={this.addStudents} />
        </Switch>
      </div>
    );
  }

  addStudents(){
    return (
      <h1>THIS ADD std</h1>
    );
  }
}



export default Students;