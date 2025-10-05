import React,{useState} from 'react';
import './AuthForm.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
const handleChange=(e)=>{
  setFormData({
    ...formData,[e.target.id]:e.target.value,
  });
}
const handleSubmit=(e)=>{
  e.preventDefault();

}

  return (
    <div className='auth_container'>
      <form  className='form-group' onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id='name'
        placeholder='Enter your name'
        value={formData.name}
        onchange={handleChange}
        required
        />
      </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id='email'
            placeholder='Enter your email'
            value={formData.email}
            onchange={handleChange}
            required
          />
        </div>
        < div className="form-group">
          <label htmlFor="pass">Password</label>
          <input type="password" id='pass'
            placeholder='Create a password'
            value={formData.password}
            onchange={handleChange}
            required
          />
        </div>
        <button type='submit' className='auth-button'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage