import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './pages/auth/Login.js';
import Register from './pages/auth/Register.js';
import ProtectedRoute from './utils/ProtectedRoute.js';
import Items from './pages/Items/Items.js';
import Profile from './pages/Profile.js';
import {HomeLayout, LoginLayout } from './utils/Layout.js';
import Home from './pages/Home.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout/>}>
            <Route element={<ProtectedRoute/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/items' element={<Items/>}>Items</Route>
                {/* --Dynamic routing--
                <Route path='/items/:id' element={<Items/>}>Items</Route> -----> to create pages to single items */}
                <Route path='/profile' element={<Profile/>}>Profile</Route>
          
            </Route>
            
            </Route>
        
        
            <Route path='/login' element={<Login/>}>Login</Route>
            <Route path='/register' element={<Register/>}>Register</Route>
        
          
         
          
          
          
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
