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
      success = <p>Group ADDED</p>
    return (
    <div>
      {success}
      <h1>THIS ADD GROUP</h1>
      <form onSubmit={this.addDiscipline}>
          <label> enter Discipline name
              <input name="code" placeholder="CODE GROUP" onChange={this.updateState} value={this.state.disciplineName}/> 
          </label>
          <input type="submit" value="ADD"/>
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