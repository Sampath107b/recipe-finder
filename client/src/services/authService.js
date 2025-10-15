import axios from 'axios';

const API_URL=import.meta.env.VITE_BACKEND_API_URL+'/api/users';

export const register=async (userData)=>{
  try{
    const response=await axios.post(`${API_URL}/register`,userData);
    return response.data;

  }
  catch(err){
    console.error('Registration Failed:',err.response.data);
    throw err.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  }
  catch (err) {
    console.error('Login Failed:', err.response.data);
    throw err.response.data;
  }
};

