import React, {Component} from "react"
import { Switch, Route } from 'react-router-dom'

class Groups extends React.Component
{
    constructor(){
        super();
        this.state={
          result:''
        }
      }
    
    componentDidMount(){
        fetch('https://marks-and-attendance.herokuapp.com/group/getAll')
  .then(response => response.json())
  .then(data => console.log(data));
      } 

    render ()
    {
        return (
          <Switch>
            <Route exact path='/groups/all' component={this.allGroups}/>
            <Route path='/groups/add' component={this.addGroups}/>
          </Switch>
          );
    }

    allGroups (){
      return(
        <h1>THIS ALL GROUPS</h1>
      );
    }

    addGroups (){
      return(
        <h1>THIS ADD GROUP</h1>
      );
    }
}



export default Groups;