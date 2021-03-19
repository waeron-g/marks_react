import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AddStudent extends React.Component {
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
    fetch('https://marks-and-attendance.herokuapp.com/group/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "groups": data }));
//     let response = fetch('https://marks-and-attendance.herokuapp.com/group/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify({
//             "code":"412"
//         })
//       });
//     console.log(response.json);
  }

  render(){
    return (
    <div className="main_block">
      <h1 className="zagolovok_main">Добавление студентов</h1>
      <form onSubmit={this.addStudent}>
          <label> Имя
              <input name="code" placeholder="CODE GROUP" onChange={this.updateName} value={this.state.name}/> 
          </label>
          <label> Фамилия
              <input name="code" placeholder="CODE GROUP" onChange={this.updateSurname} value={this.state.surname}/> 
          </label>
          <label> Номер группы
            <this.getGroups groups = {this.state.groups} Change={this.updateGroup}/> 
          </label>
          <input className="btn_edit_custom" type="submit" value="ADD"/>
      </form>
    </div>
    );
  }


  getGroups = (props) =>
  {
        let items = props.groups;
        if (items)
        {
          var groups = items.map((obj) => {
              return(
              <option key={obj.id} value={obj.id}>{obj.code}</option>
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



  addStudent = (e) =>
  {
    e.preventDefault();
    console.log(this.state);
    let stud_data = this.state;
    if (stud_data.name && stud_data.surname && stud_data.group)
    {
        let response = fetch('https://marks-and-attendance.herokuapp.com/student/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "name": stud_data.name,
            "surname": stud_data.surname,
            "groupId" : stud_data.group
        })
      });
    console.log(response.json);
    }
    }
      
}



export default AddStudent;