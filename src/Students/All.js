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
    <div className="main_block">
      <h1 className="zagolovok_main">Список студентов</h1>
      <table className="table_custom" width="100%">
          <tbody>
            <tr>
                <th>Id студента</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Группа</th>
                <th max-width="60">Редактирование</th>
            </tr>
          <this.Students students={this.state.students} del_func={this.deleteStudent}/>
          </tbody>
      </table>
      <a href="/students/add"><button className="btn_custom">Добавить студента</button></a>
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
            <td className="cst"><a className="btn_edit_custom" href={link}>Редактировать</a><button className="btn_custom_small" value={obj.id}  onClick={props.del_func}>Удалить</button></td>
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