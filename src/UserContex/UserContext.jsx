  import React, { createContext, useEffect, useState } from 'react'
  import axios from 'axios';
import { useLocation } from 'react-router-dom';

  export const UserContext = createContext();

  const UserProvider = ({ children }) => {
      
      const [user, setUser] = useState()
      const [loadingUser, setLoadingUser] = useState(true)
      const location = useLocation();

      const apiUrl = import.meta.env.VITE_API_URL;

      const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoadingUser(false);
          return;
        }
    
        try {
          const res = await axios.get(`${apiUrl}/api/getUser`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error("Failed to fetch user:", err);
        } finally {
          setLoadingUser(false);
        }
      };

      useEffect(() => {
        getUser();
      }, [location.pathname]);

    return (
      <UserContext.Provider value={{user, setUser, loadingUser}}>
          {children}
      </UserContext.Provider>
    )
  }

  export default UserProvider