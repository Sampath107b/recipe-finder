import React,{useState} from 'react'
import './AuthForm.css';
import {login} from '../services/authService';
const LoginPage = () => {
  const [formData,setFormData]=useState({
    email:'',
    password:'',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (error) setError(null);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await login(formData);

      console.log('Login successful!', data);
      if (data.token){
        localStorage.setItem('token',data.token);
        console.log('token saved to localStorage');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    }
    
  };


  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>


    </div>
  )
}

export default LoginPage