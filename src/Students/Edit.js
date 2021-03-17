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


  editStudents = (e) =>
  {
    e.preventDefault();
    let code = this.state.newCode;
    let id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    let response = fetch('https://marks-and-attendance.herokuapp.com/student/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "id": id,
            "code": code
        })
      });
      console.log(response);
    this.setState({status:"complete"});
    }

    render(){
      var student_data = this.state.student;
      if (student_data)
      {
        let student_code = this.state.student.code
        if (this.state.newCode)
          student_code = this.state.newCode
        return (
          <div>
            <form onSubmit={this.editStudent}>
            <h1>THIS <input name="code" onChange={this.updateState} value={student_code}></input> STD  <input type="submit" value="EDIT"/></h1>
            </form>
            <table border="1px" width="100%">
                <tbody>
                  <tr>
                      <th>STUDENT_ID</th>
                      <th>STUDENT_NAME</th>
                      <th>ACTION</th>
                  </tr>
                <this.Students students={student_data.students}/>
                </tbody>
            </table>
          </div>
        );
      }
      return(
        <div><h1>LOADING...</h1></div>
      )
    }
}

export default Edit;