import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllStudents from "./All"

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      group:    '',
      groups:   '',
    }
  }

  componentDidMount(){
    let student = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    fetch('https://marks-and-attendance.herokuapp.com/student/getById?id='+student)
    .then(response => response.json())
    .then(data => this.setState({ "student": data }));
    fetch('https://marks-and-attendance.herokuapp.com/group/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "groups": data }));
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
         <form>
          <label> enter Student Name
              <input name="code" placeholder="CODE GROUP" value={student_data.name}/> 
          </label>
          <label> enter Student Surname
              <input name="code" placeholder="CODE GROUP" value={student_data.surname}/> 
          </label>
          <label> enter Student Group
            <this.getGroups groups = {this.state.groups} group = {student_data.group.id} Change={this.updateGroup}/>
          </label>
          <input type="submit" value="EDIT"/>
        </form>
        </div>
      );
    }
    return(
      <div><h1>LOADING...</h1></div>
    )
  }

  getGroups = (props) =>
  {
        let items = props.groups;
        console.log(props.group)
        if (items)
        {
          var groups = items.map((obj) => {
            let checked = '';
            if (obj.id === props.group)
              checked = 'selected' 
              return(
              <option selected={checked} key={obj.id} value={obj.id}>{obj.code}</option>
             );
        });
        return(
            <select onChange={props.Change}>
                <option>SELECT GROUP</option>
                {groups}</select>
        );
          }
      return (<select><option>Loading...</option></select>);
  }

  editStudent = (e) =>
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

}

export default Edit;