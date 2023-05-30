import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
// styles
import './App.css';
// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { state } = useAuthContext()
  return (
    <div className="App">
      {state?.authIsReady && (
        <Router>
          {state.user && <Sidebar /> }
          <div className="container">
            <Navbar />
            <Routes>
              <Route path='/' element={ state.user ? <Dashboard /> : <Navigate to='/login' />}/>
              <Route path='/create' element={state.user ? <Create /> : <Navigate to='/login' />}/>
              <Route path='/project/:id' element={state.user ? <Project /> : <Navigate to='/login' />}/>
              <Route path='/login' element={state.user ? <Navigate to='/' /> : <Login />}/>
              <Route path='/signup' element={state.user ? <Navigate to='/' /> : <Signup />}/>
            </Routes>
          </div>
          {state.user && <OnlineUsers />}
        </Router>
      )}
      
    </div>
  );
}

export default App;
