import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUserId(data.userId);
        setEmail(data.email);
        setUserName(data.username);
      
      } else {
        console.error('Error fetching user:');
        setUserId(null);
        setUserName(null);
        setEmail(null);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserId(null);
      setUserName(null);
      setEmail(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading, userName , email}}>
      {children}
    </AuthContext.Provider>
  );
};

export   const useAuthContext = () => useContext(AuthContext);


