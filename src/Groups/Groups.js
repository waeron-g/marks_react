import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllGroups from "./All"
import Edit from "./Edit"

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/group/getAll').then(response => response.json()).then(data => this.setState({ "groups": data }));
  }

  render(){
    return (
      <div className="groups-wrapper">
        <Switch>
          <Route exact path='/groups' component={AllGroups} />
          <Route path='/groups/add' component={this.addGroups} />
          <Route path='/groups/edit' component={Edit} />
        </Switch>
      </div>
    );
  }

  addGroups(){
    return (
      <h1>THIS ADD GROUP</h1>
    );
  }
}



export default Groups;