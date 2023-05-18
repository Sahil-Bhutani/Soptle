import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Main from './components/Main';
import { BrowserRouter as Router ,Routes, Route} from 'react-router-dom';
import Booking_Seats from './components/Booking_Seats';
import Login_Admin from './components/Login_Admin';
import Dashboard from './components/Dashboard';
import Dashboard_View from './components/Dashboard_View';

function App() {
  const isAuthenticated=localStorage.getItem('register')
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/loginadmin' element={<Login_Admin />} />
        <Route path='/booking' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard-view' element={<Dashboard_View />} />
        <Route path='/booking_seats' element={<Booking_Seats />} />
      </Routes>
    </Router>
  );
}

export default App;
