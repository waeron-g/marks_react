import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllStudents from "./All"

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
    }
  }

  componentDidMount(){
    let student = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    fetch('https://marks-and-attendance.herokuapp.com/student/getById?id='+student)
    .then(response => response.json())
    .then(data => this.setState({ "student": data }));
    }

  render(){
    console.log(this.state.student);
    return (
      <div>
       THIS EDIT STD
      </div>
    );
  }
}



export default Edit;