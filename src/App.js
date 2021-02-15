import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      < Menu route = {window.location.pathname}/>
      <Switch>
        <Route exact path='/roster' component={Roster}/>
      </Switch>
    <main>
      <h1>MAIN BODY OF PROGRAMM</h1>
    </main>
    </div>
  );
}

const Menu = (route) =>
{
  let links = {
    "Links" : [{
        "path" : "/",
        "name" : "Главная",
        },
        {
        "path" : "/students",
        "name" : "Студенты",
        },
        {
        "path" : "/groups",
        "name" : "Группы",
        },
        {
          "path" : "/marks",
          "name" : "Оценки",
        },
        {
          "path" : "/disciplines",
          "name" : "Дисциплины",
        },
      ]
  }
  const items = [];

  var class1 = 'active';
  for (const  item of links.Links) {
    if (item.path === window.location.pathname)
      class1 = 'active';
    else
      class1= "";
    items.push(<a href = {item.path} className={class1}>{item.name}</a>);
  }
  return (
    <aside class = "main_menu">
      {items}
    </aside>
  )

}

const Roster = () =>
{
  const pathname = window.location.pathname
  console.log(pathname);
  return(
    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React FOR ROSTER
    </a>
  )
}

export default App;
