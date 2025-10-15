import React,{useState} from 'react';
import './AuthForm.css';
import {register} from '../services/authService';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error,setError]=useState(null);
const handleChange=(e)=>{
  if (error) setError(null);
  setFormData({
    ...formData,[e.target.id]:e.target.value,
  });
}
const handleSubmit=async (e)=>{
  e.preventDefault();
  setError(null);
  try{
    const data=await register(formData);
    console.log('Registration successful:',data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      console.log('token saved to localStorage after registration');
    }
  }
  catch(err){
    console.error(err);
    setError(err.message || 'An unexpected error occurred. Please try again.')
    setFormData({
      name: '',
      email: '',
      password: '',
    })
  }

}

  return (
    <div className='auth-container'>
      <form  className='auth-form' onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id='name'
        placeholder='Enter your name'
        value={formData.name}
        onChange={handleChange}
        required
        />
      </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id='email'
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        < div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id='password'
            placeholder='Create a password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='auth-button'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage