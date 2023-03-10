import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // firebase의 인증이 되었다면 로그인을 유지하는 인증 메서드
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
      
      } else {
        setUser(null)
      }
    });
  }, []);

  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
