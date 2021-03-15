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
      let group_code = this.state.group.code
      if (this.state.newCode)
        group_code = this.state.newCode
      return (
        <div>
          <form onSubmit={this.editGroup}>
          <h1>THIS <input name="code" onChange={this.updateState} value={group_code}></input> GROUP  <input type="submit" value="EDIT"/></h1>
          </form>
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

  updateState = (e) => {
    this.setState({ newCode: e.currentTarget.value })
  }

  editGroup = (e) =>
  {
    e.preventDefault();
    let code = this.state.newCode;
    let id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    let response = fetch('https://marks-and-attendance.herokuapp.com/group/edit', {
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