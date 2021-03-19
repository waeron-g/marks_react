import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      codeGroup: '',
      status:   '',
    }
  }

//   componentDidMount(){
//     let response = fetch('https://marks-and-attendance.herokuapp.com/group/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//         },
//         body: JSON.stringify({
//             "code":"412"
//         })
//       });
//     console.log(response.json);
//   }

  render(){
    let  success = ""
    if (this.state.status)
      success = <p>Группа добавлена</p>
    return (
    <div className="main_block">
      {success}
      <h1 className="zagolovok_main">Добавление группы</h1>
      <form onSubmit={this.addGroup}>
          <label> Введите название:
              <input name="code" placeholder="Название" onChange={this.updateState} value={this.state.codeGroup}/> 
          </label>
          <input className="btn_edit_custom" type="submit" value="ADD"/>
      </form>
    </div>
    );
  }


  updateState = (e) => {
    this.setState({ codeGroup: e.currentTarget.value })
  }

  addGroup = (e) =>
  {
    e.preventDefault();
    let code = this.state.codeGroup;
    let response = fetch('https://marks-and-attendance.herokuapp.com/group/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            "code": code
        })
      });
    this.setState({status:"complete"});
    }
      
}



export default AddGroup;