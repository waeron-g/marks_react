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
      let student_name = this.state.student.name
      if (this.state.name)
      student_name = this.state.name

      let student_surname = this.state.student.surname
      if (this.state.surname)
      student_surname = this.state.surname

      let student_group = this.state.student.group
      if (this.state.group)
      student_group = this.state.group
      return (
        <div className="main_block">
        <h1 className="zagolovok_main">Редактирование</h1>
         <form onSubmit={this.editStudent}>
          <label> Введите имя студента: 
              <input name="code" placeholder="Имя" onChange={this.updateName} value={student_name}/> 
          </label><br/>
          <label> Введите фамилию студента: 
              <input name="code" placeholder="Фамилия" onChange={this.updateSurname} value={student_surname}/> 
          </label><br/>
          <label> Введите группу студента: 
            <this.getGroups groups = {this.state.groups} group = {student_data.group.id} Change={this.updateGroup}/>
          </label><br/>
          <input className="btn_custom_l" type="submit" value="Редактировать"/>
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

  updateName = (e) => {
    this.setState({ name: e.currentTarget.value })
  }

  updateSurname = (e) => {
    this.setState({ surname: e.currentTarget.value })
  }

  updateGroup = (e) => {
    this.setState({ group: e.currentTarget.value })
  }

  editStudent = (e) =>
  {
    e.preventDefault();
    let name = (this.state.name) ? this.state.name :this.state.student.name;
    let surname = (this.state.surname) ? this.state.surname :this.state.student.surname;
    let group = (this.state.group) ? this.state.group :this.state.student.group;
    
    let id = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    
      let response = fetch('https://marks-and-attendance.herokuapp.com/student/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            "name": name,
            "surname": surname,
            "group" : group,
            "id": id
          })
        });
        console.log(response);
      this.setState({status:"complete"});
      alert('ok')
      }
    

}

export default Edit;