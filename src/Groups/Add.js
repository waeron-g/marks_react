import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AddGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      codeGroup: ''
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
    return (
    <div>
      <h1>THIS ADD GROUP</h1>
      <form onSubmit={this.addGroup}>
          <label> enter Code Group
              <input name="code" placeholder="CODE GROUP" onChange={this.updateState} value={this.state.codeGroup}/> 
          </label>
          <input type="submit" value="ADD"/>
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
    console.log(this.state);
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
    console.log(response.json);
    }
      
}



export default AddGroup;