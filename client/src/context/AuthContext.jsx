import React, {createContext,useState,useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';

const parseJwt=(token)=>{
  try{
    return JSON.parse(atob(token.split('.')[1]));
  }
  catch(e){
    return null;
  }
};

export const AuthContext=createContext(null);

export const useAuth=()=>{
  return useContext(AuthContext);
};


export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if (token){
      const decodedUser=parseJwt(token);
      if (decodedUser && decodedUser.exp*1000>Date.now()){
        setUser({
          id:decodedUser.id,
          name:decodedUser.name,
          email:decodedUser.email,
        });
      }
      else{
        localStorage.removeItem('token');
      }
    }
    setLoading(false);

  },[]);
  const login=(userData)=>{
    setUser(userData);
  }
  
  const logout=()=>{
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const authContextValue={
    user,
    loading,
    login,
    logout,
  };

  return(
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  )

}