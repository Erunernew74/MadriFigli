import NavbarBoots from "./components/NavbarBoots/NavbarBoots";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InserimentoUsers from './pages/InserimentoUsers';
import Home from './pages/Home'
import ListaUsers from './pages/ListaUsers'
import About from "./pages/About";
import CercaUser from "./pages/CercaUser"

function App() {
  return (
    <Router>
      <NavbarBoots />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' exact component={About} />
        <Route path='/inserimento' exact component={InserimentoUsers} />
        <Route path='/cercaUser' exact component={CercaUser} />
        <Route path='/lista' exact component={ListaUsers} />
      </Switch>
    </Router>
  );
}

export default App;
