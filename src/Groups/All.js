import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AllGroups extends React.Component {
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

  deleteGroup = (e) =>
  {
    let uuid = e.currentTarget.value;
    console.log(uuid);
    fetch('https://marks-and-attendance.herokuapp.com/group/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          "id": uuid
      })
      });
    }

  render(){
    return (
    <div>
      <h1>THIS ALL GROUPS</h1>
      <table border="1px" width="100%">
          <tbody>
            <tr>
                <th>GROUP_ID</th>
                <th>GROUP_NAME</th>
                <th>ACTION</th>
            </tr>
          <this.Groups groups={this.state.groups} del_func={this.deleteGroup}/>
          </tbody>
      </table>
      <a href="/groups/add"><button>ADD GROUP</button></a>
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
            <td><a href={link}>EDIT</a> <button value={obj.id}  onClick={props.del_func}>DELETE</button></td>
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



export default AllGroups;