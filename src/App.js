import { Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Groups from './Groups/Groups'
import Students from './Students/Students'
// https://marks-and-attendance.herokuapp.com/group/getAll
function App() {
  return (
    <div className="App">
      <Header route = {window.location.pathname}/>
    <main>
    <Switch>
        <Route path='/groups' component={Groups}/>
        <Route path='/students' component={Students}/>
    </Switch>
    </main>
    </div>
  );
}

export default App;
