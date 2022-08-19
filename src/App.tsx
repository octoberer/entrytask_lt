import React from 'react';
import Login from './pages/login/ login';
import Home from './pages/home/index'
import {Route,Routes,Navigate} from 'react-router-dom'
import 'antd/dist/antd.css'
import './App.css'
function App() {
  return (
    <div  className="App">
      <Routes>
        <Route path='/home/*' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Navigate to='/home'/>}/>
      </Routes>
    </div>
  );
}


export default App;
