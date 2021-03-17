import { Switch, Route } from 'react-router-dom'
import Header from './Header/Header'
import Groups from './Groups/Groups'
import Students from './Students/Students'
import Disciplines from './Discipline/Disciplines';
// https://marks-and-attendance.herokuapp.com
function App() {
  return (
    <div className="App">
      <Header route = {window.location.pathname}/>
    <main>
    <Switch>
        <Route path='/groups' component={Groups}/>
        <Route path='/students' component={Students}/>
        <Route path='/disciplines' component={Disciplines}/>
    </Switch>
    </main>
    </div>
  );
}

export default App;
