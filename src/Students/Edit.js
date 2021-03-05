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

    let response = fetch('https://marks-and-attendance.herokuapp.com/student/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({"id":"fbfc14ec-d1d2-4ab2-a55d-4310ee1fc342",
        "code":"411",
        })
      });
    // console.log(response.json);
    this.setState((state) => {return ({student_id: student})});
    }

  render(){
    console.log(this.state.student_id);
    console.log(this.state.student);
    return (
      <div>
       THIS EDIT STD
      </div>
    );
  }
}



export default Edit;