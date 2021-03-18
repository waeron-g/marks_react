import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllMarks from "./All"
import Journal from "./Journal"

class Students extends React.Component {

  render(){
    console.log(this.props.match.params);
    return (
      <div className="students-wrapper">
        <Switch>
          <Route exact path='/marks' component={AllMarks} />
          <Route path='/marks/journal/:student?/:group?/:discipline?/:time?' component={Journal} />
       </Switch>
      </div>
    );
  }

}



export default Students;