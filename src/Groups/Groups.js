import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllGroups from "./All"
import Edit from "./Edit"
import AddGroup from "./Add"

class Groups extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/group/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "groups": data }));
  }

  render(){
    return (
      <div className="groups-wrapper">
        <Switch>
          <Route exact path='/groups' component={AllGroups} />
          <Route path='/groups/add' component={AddGroup} />
          <Route path='/groups/edit' component={Edit} />
        </Switch>
      </div>
    );
  }
}



export default Groups;