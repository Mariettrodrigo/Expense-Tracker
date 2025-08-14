import React from 'react';
import {
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
import UserProvider from './context/usercontext';

const App = () => {
  // Check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
