import React, { Component } from "react"
import { Switch, Route } from 'react-router-dom'
import AllStudents from "./All"

class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      result: ''
    }
  }
  componentDidMount(){
  fetch('https://marks-and-attendance.herokuapp.com/discipline/getAll')
    .then(response => response.json())
    .then(data => this.setState({ "disciplines": data }));
  if (this.props.match.params.time)
  {
    let times = this.props.match.params.time.split('.');
    this.setState({time_start : times[0]});
    if (times[1])
      this.setState({time_end : times[1]});
    else
    {
      var today =  this.DateToString(null);
      this.setState({time_end : today});
    }
    let start = times[0];
    let end = (times[1])? times[1] : today;
    let dates = Array();
    while (start !== end) 
    {
      dates.push(start);
      start = this.DateToString(Date.parse(start)+24*60*60*1000);  
    }
    dates.push(end);
    this.setState({days:dates});
  }
  if (this.props.match.params.student !== "0")
  {
    fetch('https://marks-and-attendance.herokuapp.com/student/getById?id='+this.props.match.params.student)
    .then(response => response.json()).then(data => this.setState({ "student": data }))
    fetch('https://marks-and-attendance.herokuapp.com/mark/getAll')
    .then(response => response.json()).then(data => this.setState({ "marks": data }));
  }
  if (this.props.match.params.group !== "0")
  {
      fetch('https://marks-and-attendance.herokuapp.com/group/getById?id='+this.props.match.params.group).then(response => response.json()).then(data => this.setState({ "group": data }))
    if (this.props.match.params.discipline !== "0")
    {
      this.setState({discipline:this.props.match.params.discipline})
      fetch('https://marks-and-attendance.herokuapp.com/mark/getAll')
      .then(response => response.json()).then(data => this.setState({ "marks": data }));
      this.setState({discipline:this.props.match.params.discipline})
    }
    else
      fetch('https://marks-and-attendance.herokuapp.com/mark/getAll')
      .then(response => response.json()).then(data => this.setState({ "marks": data }));
  }
  }

  render(){
    if (this.state.marks)
    {
      let Header = this.getHeader();
      let Days = this.getAllDays();
      let Rows = this.getRows();
      let Discipline_name = this.getDisciplineName(this.state.discipline);
      return (
        <div>
          <h1>{Discipline_name}</h1>
        <table border="1px" width="100%">
          <tbody>
            <tr>
            <th>{Header}</th>
            {Days}
            </tr>
            {Rows}
          </tbody>
        </table> 
        </div>
      );
    }
    return (
      <h1>LOADING...</h1>
    );
  }

  getRows = () =>
  {
    if (this.state.student)
    {
      let marks = this.state.marks.map( (obj) => {
        if (obj.studentId === this.state.student.id)
          return(obj)
        return(null)
      });
      // Я ХЗ КАК Я ЭТО ЗАПИЛЮ
    }
    if (this.state.group && this.state.marks)
    {
      let group = this.state.group;
      let days = this.state.days;
      let marks = this.state.marks
      let discipline = this.state.discipline;

      let rows = group.students.map((student) => {
        let cells = days.map((day) =>
        {
          let cell = marks.find((mark) =>{
            if(mark.discipline.id === discipline && mark.date === day && mark.studentId.id === student.id
            && mark.studentId.group.id === group.id)
              return(true)
            return (false)
          });
          if (cell !== undefined)
          {
            let val = (cell.mark > 0) ? cell.mark : (cell.visited) ? "+" : "-";
            return(
              <td key = {cell.studentId.id+"+" + day}>
              <input
                data-mark = {cell.id} 
                data-student={cell.studentId.id} 
                data-discipline={cell.discipline.id}
                data-date={day} 
                defaultValue={val} onChange={this.updateMark}/>
              </td>
            );
          }
          return(
            <td key = {student.id+"+" + day}>
            <input 
              data-student={student.id} 
              data-discipline={discipline}
              data-date={day} 
              onChange={this.updateMark}
              />
            </td>
          )
        });  
        return(
          <tr key = {student.id}>
            <td> {student.name} {student.surname} </td>
            {cells}
          </tr>
        );
      })
      return (rows);
    }
    return (<tr><td>LOADING...</td></tr>)
  }

  //on unfocus
  updateMark = (e) => {
    let dataset = e.currentTarget.dataset;
    let newValue = e.currentTarget.value;
    let oldValue = e.currentTarget.defaultValue;
    if (newValue || oldValue)
    {
      if (newValue && oldValue)
        this.editMark(dataset, newValue);
      else if (newValue && !oldValue)
        this.addMark(dataset, newValue);
      else if (!newValue && oldValue)
        this.removeMark(dataset.mark);
    }
  }

  editMark = (dataset, value) =>
  {
    let mark = (parseInt(value) != NaN) ? value : 0;
    let visited = (mark > 0) ? true : (value === "+") ? true : false;
  let responce = fetch('https://marks-and-attendance.herokuapp.com/mark/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "id"  : dataset.mark,
        "date": dataset.date,
        "mark":mark,
        "disciplineId":dataset.discipline,
        "studentId":dataset.student,
        "visited": visited
      })
    });
  }
  
  addMark = (dataset, value) =>
  {
      let mark = (parseInt(value) != NaN) ? value : 0;
      let visited = (mark > 0) ? true : (value === "+") ? true : false;
    let responce = fetch('https://marks-and-attendance.herokuapp.com/mark/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          "date": dataset.date,
          "mark":mark,
          "disciplineId":dataset.discipline,
          "studentId":dataset.student,
          "visited": visited
        })
      });
  }

  removeMark = (id) =>
  {
    let responce = fetch('https://marks-and-attendance.herokuapp.com/mark/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        "id"  : id,
      })
    });
  }

  DateToString = (DateString) =>
  {
      let Day = (DateString) ? new Date(DateString): new Date();
      let dd = String(Day.getDate()).padStart(2, '0');
      let mm = String(Day.getMonth() + 1).padStart(2, '0');
      let yyyy = Day.getFullYear();
      return(yyyy + '-' + mm + '-' + dd);
  }

  getAllDays = () =>
  {
    if (this.state.days)
    {
    let dates = this.state.days;
    let table = dates.map((obj) => {return(<th key={obj}>{obj}</th>);});
    return(table);
    }
    return(<th>LOADING...</th>)
  }

  getHeader = () =>
  {      
    if (this.state.student)
    {
      let student = this.state.student
      return ("Студент группы " + student.group.code + " " + student.surname + " " + student.name);
    }
    if (this.state.group)
      return ("Группа " + this.state.group.code);
    return ("LOADING...");
  }

  getDisciplineName = (id) =>
  {
    if (this.state.disciplines)
    {
      var discipline_data = '';
      for(var i = 0; i < this.state.disciplines.length; i++)
        if(this.state.disciplines[i].id == id)
          return (this.state.disciplines[i].name)
    }
  }

}



export default Students;