import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllGroups from "./All"

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
    }
  }

  componentDidMount(){
    let group = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);

    let response = fetch('https://marks-and-attendance.herokuapp.com/group/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({"id":"fbfc14ec-d1d2-4ab2-a55d-4310ee1fc342",
        "code":"411",
        })
      });
    // console.log(response.json);
    this.setState((state) => {return ({group_id: group})});
    }

  render(){
    console.log(this.state.group_id);
    console.log(this.state.group);
    return (
      <div>
       THIS EDIT GROUP
      </div>
    );
  }
}



export default Edit;