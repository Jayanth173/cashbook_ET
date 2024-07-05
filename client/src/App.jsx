import React from 'react'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sideabar'
import BusinessBook from './pages/BusinessBook/BusinessBook'
import CheckIn from './pages/CheckIn/CheckIn'
import CheckOut from './pages/CheckOut/CheckOut'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Income from './pages/Income/Income'
import Outlay from './pages/Outlay/Outlay'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
const App = () => {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/home" element={<BusinessBook />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path='/checkout' element={<CheckOut/>}/>
         <Route path='/income' element={<Income/>}/>
        <Route path='/outlay' element={<Outlay/>}/>  
      </Routes>
    </div>
  </Router>
  )
}

export default App