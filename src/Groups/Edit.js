import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllGroups from "./All"

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
    }
  }

  componentDidMount(){
    let group = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);  
    fetch('https://marks-and-attendance.herokuapp.com/group/getById?id='+group)
    .then(response => response.json())
    .then(data => this.setState({ "group": data }));
    fetch('https://marks-and-attendance.herokuapp.com/student/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "free": data }));
    this.setState((state) => {return ({group_id: group})});
    }

  render(){
    var group_data = this.state.group;
    if (group_data)
    {
      var student_data = this.state.free;
      console.log(student_data);
      return (
        <div>
          <h1>THIS {group_data.code} GROUP</h1>
          <table border="1px" width="100%">
              <tbody>
                <tr>
                    <th>STUDENT_ID</th>
                    <th>STUDENT_NAME</th>
                    <th>ACTION</th>
                </tr>
              <this.Students students={group_data.students}/>
              </tbody>
          </table>
        </div>
      );
    }
    return(
      <div><h1>LOADING...</h1></div>
    )
  }

  Students (props)
  {
    var items = props.students;
    if (items)
    {
      var students = items.map((obj) => {
        let link = "/students/edit/"+obj.id;
        return(
        <tr key = {obj.id}>
        <td>{obj.id}</td>
        <td>{obj.surname} {obj.name}</td>
        <td><a href={link}>EDIT</a></td>
        </tr>
        );
      });
      return(
      students
      );
    }
    return(<tr><td colSpan = "3" >NO ONE Student in group</td></tr>)
  }

  AddStudent ()
  {
    if (this.state)
    {
      let free_students = this.state;
      console.log(free_students)
    }
    return(<p>TEST</p>);
  }

}



export default Edit;