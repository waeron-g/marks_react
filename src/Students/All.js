import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AllStudents extends React.Component {
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
    <div>
      <h1>THIS ALL Students</h1>
      <table border="1px" width="100%">
          <tbody>
            <tr>
                <th>STD_ID</th>
                <th>STD_NAME</th>
                <th>STD_SURNAME</th>
                <th>GROUP</th>
                <th>EDIT</th>
            </tr>
          <this.Students students={this.state.students} del_func={this.deleteStudent}/>
          </tbody>
      </table>
      <a href="/students/add"><button>ADD Student</button></a>
    </div>
    );
  }

  Students (props)
  {
      let items = props.students;
     
      if (items)
      {
        var students = items.map((obj) => {
           let link = "students/edit/"+obj.id;
            return(
            <tr key = {obj.id}>
            <td>{obj.id}</td>
            <td>{obj.name}</td>
            <td>{obj.surname}</td>
            <td>{obj.group.code}</td>
            <td><a href={link}>EDIT</a><button value={obj.id}  onClick={props.del_func}>DELETE</button></td>
            </tr>
           );
      });
      return(
      students
      );
        }
    return (<tr><td colSpan="5">Loading...</td></tr>);
  }


  deleteStudent = (e) =>
  {
    let uuid = e.currentTarget.value;
    fetch('https://marks-and-attendance.herokuapp.com/student/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          "id": uuid
      })
      });
    }
}



export default AllStudents;