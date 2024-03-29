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
        <div className="main_block">
          <form onSubmit={this.editGroup}>
          <h1 className="zagolovok_main">Группа №<input name="code" onChange={this.updateState} value={group_code}></input> <input className="btn_custom" type="submit" value="EDIT"/></h1>
          </form>
          <table className="table_custom" width="100%">
              <tbody>
                <tr>
                    <th>Id студента</th>
                    <th>Имя</th>
                    <th>Редактирование</th>
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
    if (items.length > 0)
    {
      var students = items.map((obj) => {
        let link = "/students/edit/"+obj.id;
        return(
        <tr key = {obj.id}>
        <td>{obj.id}</td>
        <td>{obj.surname} {obj.name}</td>
        <td className="cst"><a className="btn_edit_custom" href={link}>EDIT</a></td>
        </tr>
        );
      });
      return(
      students
      );
    }
    return(<tr><td colSpan = "3" >NO ONE Student in group</td></tr>)
  }
}



export default Edit;