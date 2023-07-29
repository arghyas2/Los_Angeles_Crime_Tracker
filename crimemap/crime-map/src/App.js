import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Link, Routes, useSearchParams } from 'react-router-dom'
import { Home } from './pages/Home'
import { Query1 } from './pages/Query1';
import { Query2 } from './pages/Query2';
import { Update } from './pages/Update';

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/query1" element={<Query1 />}/>
          <Route exact path="/query2" element={<Query2 />}/>
          <Route exact path="/update" element={<Update />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
