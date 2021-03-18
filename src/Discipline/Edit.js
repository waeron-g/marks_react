import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class Edit extends React.Component {
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
    this.setState({'id':window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1)})
  }

  render(){
    if (this.state.disciplines)
    {
      var discipline_data = '';
      for(var i = 0; i < this.state.disciplines.length; i++)
        if(this.state.disciplines[i].id == this.state.id)
          discipline_data = this.state.disciplines[i];
    }
    if (discipline_data)
    {
      let discipline_name = discipline_data.name
      if (this.state.newName)
        discipline_name = this.state.newName;
      let success = "";
      if (this.state.status === "complete")
        success = <h1>DISCIPLINE EDITED</h1>
      return (
        <div>
          {success}
          <form onSubmit={this.editDiscipline}>
          <h1>THIS <input name="code" onChange={this.updateState} value={discipline_name}></input> Discipline  <input type="submit" value="EDIT"/></h1>
          </form>
        </div>
      );
    }
    return(
      <div><h1>LOADING...</h1></div>
    )
  }

  updateState = (e) => {
    this.setState({ newName: e.currentTarget.value })
  }

  editDiscipline = (e) =>
  {
    e.preventDefault();
    let name = this.state.newName;
    let id = this.state.id;
    let response = fetch('https://marks-and-attendance.herokuapp.com/discipline/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "id": id,
            "name": name
        })
      });
    this.setState({status:"complete"});
    }

}



export default Edit;