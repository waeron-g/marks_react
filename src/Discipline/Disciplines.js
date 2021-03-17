import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllDisciplines from "./All"
import Edit from "./Edit"
import AddDiscipline from "./Add"

class Disciplines extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/discipline/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "disciplines": data }));
  }

  render(){
    return (
      <div className="groups-wrapper">
        <Switch>
          <Route exact path='/disciplines' component={AllDisciplines} />
          <Route path='/disciplines/add' component={AddDiscipline} />
          <Route path='/disciplines/edit' component={Edit} />
        </Switch>
      </div>
    );
  }
}



export default Disciplines;