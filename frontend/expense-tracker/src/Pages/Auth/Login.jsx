import React, { useState } from 'react';
import AuthLayout from '../../Components/layouts/AuthLayout';
import Input from '../../Components/Inputs/Input'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder='maria@example.com'
            type='text'
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder='Min 8 Characters'
            type='password'
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;