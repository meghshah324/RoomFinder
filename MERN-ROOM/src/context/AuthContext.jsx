import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setUser(data.userId);
        setUserName(data.username);
      } else {
        setUser(null);
        setUserName(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setUserName(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // ✅ only run once

  return (
    <AuthContext.Provider value={{ user, loading, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
