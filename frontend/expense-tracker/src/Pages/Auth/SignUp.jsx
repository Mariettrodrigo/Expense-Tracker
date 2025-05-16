import React, { useState } from 'react'
import AuthLayout from '../../Components/layouts/AuthLayout';
import Input from '../../Components/Inputs/Input'; 
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../Utils/helper';


const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle signup form submit

  return (
    <div>
      SignUp
    </div>
  )
}

export default SignUp
