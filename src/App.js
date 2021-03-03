import { Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Groups from './Groups/Groups'
// https://marks-and-attendance.herokuapp.com/group/getAll
function App() {
  return (
    <div className="App">
      <Header route = {window.location.pathname}/>
    <main>
    <Switch>
        <Route exact path='/roster' component={Roster}/>
        <Route path='/groups' component={Groups}/>
    </Switch>
    </main>
    </div>
  );
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
