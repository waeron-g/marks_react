import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllGroups from "./All"

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
    
      </div>
    );
  }

    Groups (props)
    {
        let items = props.groups;
        if (items)
        {
          var groups = items.map((obj) => {
             let link = "groups/edit/"+obj.id;
              return(
              <tr key = {obj.id}>
              <td>{obj.id}</td>
              <td>{obj.code}</td>
              <td><a href={link}>EDIT</a></td>
              </tr>
             );
        });
        return(
        groups
        );
          }
      return (<tr><td colSpan="3">Loading...</td></tr>);
    }
  }
}



export default Group;