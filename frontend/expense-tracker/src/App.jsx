import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Home from './Pages/Dashboard/Home';
import Income from './Pages/Dashboard/Income';
import Expense from './Pages/Dashboard/Expense';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signUp" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App

const Root =() => {
  //check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirected to dashboard if authenticated, otherwise to login
  return isAuthenticated ?(
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to = "/login" />
  );
  
};
