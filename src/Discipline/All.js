import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AllDisciplines extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
      status: '',
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/discipline/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "disciplines": data }));
  }

  deleteDiscipline = (e) =>
  {
    let uuid = e.currentTarget.value;
    fetch('https://marks-and-attendance.herokuapp.com/discipline/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          "id": uuid
      })
      });
    this.setState({status:'discipline deleted'});
    }

  render(){
    let  success = ""
    if (this.state.status)
      success = <p>{this.state.status}</p>
    return (
    <div className="main_block">
      {success}
      <h1 className="zagolovok_main">Дисциплины</h1>
      <table className="table_custom" width="100%">
          <tbody>
            <tr>
                <th>Id дисциплины</th>
                <th>Дисциплина</th>
                <th width="200px">Редактирование</th>
            </tr>
          <this.Disciplines disciplines={this.state.disciplines} del_func={this.deleteDiscipline}/>
          </tbody>
      </table>
      <a href="/disciplines/add"><button className="btn_custom">Добавить</button></a>
    </div>
    );
  }

  Disciplines (props)
  {
      let items = props.disciplines;
      if (items)
      {
        var disciplines = items.map((obj) => {
           let link = "disciplines/edit/"+obj.id;
            return(
            <tr key = {obj.id}>
            <td>{obj.id}</td>
            <td>{obj.name}</td>
            <td className="cst"><a className="btn_edit_custom1" href={link}>Редактировать</a> <button className="btn_custom_small" value={obj.id}  onClick={props.del_func}>Удалить</button></td>
            </tr>
           );
      });
      return(
      disciplines
      );
        }
    return (<tr><td colSpan="3">Loading...</td></tr>);
  }

}



export default AllDisciplines;