import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AddDiscipline extends React.Component {
  constructor() {
    super();
    this.state = {
      disciplineName: '',
      status:   '',
    }
  }

  render(){
    let  success = ""
    if (this.state.status)
      success = <p>Дисциплина добавлена</p>
    return (
    <div className="main_block">
      {success}
      <h1 className="zagolovok_main">Добавление дисциплины</h1>
      <form onSubmit={this.addDiscipline}>
          <label> Введите название: 
              <input name="code" placeholder="Название" onChange={this.updateState} value={this.state.disciplineName}/> 
          </label>
          <input className="btn_edit_custom" type="submit" value="Создать"/>
      </form>
    </div>
    );
  }


  updateState = (e) => {
    this.setState({ disciplineName: e.currentTarget.value })
  }

  addDiscipline = (e) =>
  {
    e.preventDefault();
    let name = this.state.disciplineName;
    let response = fetch('https://marks-and-attendance.herokuapp.com/discipline/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "name": name
        })
      });
    this.setState({status:"complete"});
    }
      
}



export default AddDiscipline;