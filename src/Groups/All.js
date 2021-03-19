import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AllGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '',
      status: '',
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
    this.setState({status:'group deleted'});
    }

  render(){
    let  success = ""
    if (this.state.status)
      success = <p>{this.state.status}</p>
    return (
    <div className="main_block">
      {success}
      <h1 className="zagolovok_main">Группы</h1>
      <table className="table_custom" width="100%">
          <tbody>
            <tr>
                <th>Id Группы</th>
                <th>Номер Группы</th>
                <th>Редактирование</th>
            </tr>
          <this.Groups groups={this.state.groups} del_func={this.deleteGroup}/>
          </tbody>
      </table>
      <a href="/groups/add"><button className="btn_custom">Добавить группу</button></a>
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
            <td><a className="btn_edit_custom" href={link}>Редактировать</a> <button className="btn_custom_small" value={obj.id}  onClick={props.del_func}>Удалить</button></td>
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