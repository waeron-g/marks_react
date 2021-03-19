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
    <div className="main_block2">
      <h1 className="zagolovok_main">Журнал</h1>
      <label>Начало: <input onChange={this.updateStartTime} type="date" value = {this.state.time_start} /></label>
      <label>Конец: <input type="date" onChange={this.updateEndTime} value = {this.state.time_end} /></label><br/>
      <this.typeJournal current={this.state.type} Change={this.updateType}/><br/>
      {SelectRender}
      <a href ={this.state.link}><button className="btn_custom" onClick = {this.updateLink}>Показать</button></a>
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
         <option >SELECT STUDENT</option>
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
          <option >SELECT GROUP</option>
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
    if (e.currentTarget.value === "student")
      this.setState({group:"", discipline:""})
    if (e.currentTarget.value === "group")
      this.setState({student:""})
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

  updateDiscipline = (e) => {
    this.setState({ discipline: e.currentTarget.value })
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
    let time_end  = (this.state.time_end) ? this.state.time_end : this.DateToString(null);
    let time_start =  (this.state.time_start) ? this.state.time_start :  this.DateToString(Date.parse(time_end)-7*24*60*60*1000);
    let time = time_start + "." + time_end;
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

  DateToString = (DateString) =>
  {
      let Day = (DateString) ? new Date(DateString): new Date();
      let dd = String(Day.getDate()).padStart(2, '0');
      let mm = String(Day.getMonth() + 1).padStart(2, '0');
      let yyyy = Day.getFullYear();
      return(yyyy + '-' + mm + '-' + dd);
  }

}



export default AllMarks;