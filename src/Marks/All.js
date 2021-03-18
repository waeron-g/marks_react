import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'

class AllMarks extends React.Component {
  constructor() {
    super();
    this.state = {
      student:    '0',
      group:      '0',
      discipline: '0',
      time_start : '',
      time_end    : '',
    }
  }

  componentDidMount(){
    fetch('https://marks-and-attendance.herokuapp.com/group/getAll').then(response => response.json()).then(data => this.setState({ "groups": data }));
    fetch('https://marks-and-attendance.herokuapp.com/discipline/getAll').then(response => response.json()).then(data => this.setState({ "disciplines": data }));
    fetch('https://marks-and-attendance.herokuapp.com/student/getAll').then(response => response.json()).then(data => this.setState({ "students": data }));
  }

  render(){
    console.log(this.state.link);
    let SelectRender = ""
    if (this.state.type)
    SelectRender = (this.state.type === "student" ) ? <this.studentRender update = {this.updateStudent}/> : 
    (this.state.type === "group" ) ? <this.groupRender updateG = {this.updateGroup} updateD = {this.updateDiscipline}/>: <p></p>;
    return (
    <div>
      <h1>THIS JOURNAL PARAMS</h1>
      <label>START DATE<input onChange={this.updateStartTime} type="date" value = {this.state.time_start} /></label>
      <label>END DATE<input type="date" onChange={this.updateEndTime} value = {this.state.time_end} /></label><br/>
      <this.typeJournal current={this.state.type} Change={this.updateType}/><br/>
      {SelectRender}
      <a href ={this.state.link}><button>SHOW JOURNAL</button></a>
    </div>
    );
  }

  studentRender = (props) =>
  {
    let students = this.state.students;
    if (students)
    {
      let items = students.map((obj) => {
        let checked = ""
        if (this.state.student === obj.id)
          checked = "selected";
        return(
              <option key={obj.id} selected={checked} value={obj.id}>{obj.name} {obj.surname}</option>
             );
        });
      return(
        <select onChange={props.update}>
          {items}
        </select>
      )
    }
    return(
      <select >
        <option>LOADING...</option>
      </select>
    )
  }

  groupRender = (props) =>
  {
    let groups = this.state.groups;
    let disciplines = this.state.disciplines;
    if (groups && disciplines)
    {
      let items = groups.map((obj) => {
        let checked = ""
        if (this.state.group === obj.id)
          checked = "selected";
        return(
              <option key={obj.id} selected={checked} value={obj.id}>{obj.code}</option>
             );
        });
        let disc = disciplines.map((obj) => {
          let checked = ""
          if (this.state.discipline === obj.id)
            checked = "selected";
          return(
                <option key={obj.id} selected={checked} value={obj.id}>{obj.name}</option>
               );
          });
  
      return(
        <div>
          <select onChange={props.updateG}>
            {items}
          </select>
          <select onChange={props.updateD}>
          <option  value={null}>Without discipline</option>
            {disc}
          </select>
        </div>
      )
    }
    return(
      <select >
        <option>LOADING!...</option>
      </select>
    )
  }

  typeJournal = (props) =>
  {
      let items = [
        {
          name : "Студент",
          code : "student"
        },
        {
          name : "Группа",
          code : "group"
        },
      ];
      var types = items.map((obj) => {
        let checked = ""
        if (this.state.type === obj.code)
          checked = "selected";
        return(
              <option key={obj.code} selected={checked} value={obj.code}>{obj.name}</option>
             );
        });
        return(
            <select onChange={props.Change}>
                <option>SELECT JOURNAL TYPE</option>
                {types}</select>
        );
  }

  updateType = (e) => {
    this.setState({ type: e.currentTarget.value })
    this.updateLink();
  }

  updateStudent = (e) => {
    this.setState({ student: e.currentTarget.value })
    this.updateLink();
  }

  updateGroup = (e) => {
    this.setState({ group: e.currentTarget.value })
    this.updateLink();
  }

  updateStartTime = (e) => {
    this.setState({ time_start: e.currentTarget.value })
    this.updateLink();
  }

  updateEndTime = (e) => {
    this.setState({ time_end: e.currentTarget.value })
    this.updateLink();
  }

  updateLink = () =>
  {
    let path = "/marks/journal/";
    let student = this.state.student;
    let group = this.state.group;
    let discipline = this.state.discipline;
    let time = this.state.time_start + "." + this.state.time_end;
    if (this.state.type)
    {
      if (this.state.type === "student")
      {
        this.setState({link: path + student+"/0/0/" + time})
      }
      if (this.state.type === "group")
      {
        if (this.state.discipline)
          this.setState({link: path+"0/"+group+"/" + discipline + "/" + time});
        else
          this.setState({link: path+"0/"+group+"/0/"+ time});
        
      }
    }
  }
}



export default AllMarks;