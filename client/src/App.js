// import logo from './logo.svg';
// import './App.css';

import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    <>
    <Routes>
      {/* for homepage route */}
      <Route path="/" element={<HomePage/>} />

      {/* route for register page */}
      <Route path="/register" element={<Register/>}/>

      {/* route for login page */}
      <Route path='/login' element={<Login/>}/>
      
    </Routes>
    </>
  );
}

export default App;
