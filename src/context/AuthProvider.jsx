import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(user);
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const createNewUserWithGoogle = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const singInWithGoogle = (googleProvider) => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const profileUpDate = (upDatedProfile) => {
    return updateProfile(auth.currentUser, upDatedProfile);
  };
  const singOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        const { data } = await axios.post(
          `${import.meta.env.VITE_serverUrl}/jwt`,
          {
            email: currentUser?.email,
          },
          {
            withCredentials: true,
          }
        );
        console.log(data);
      } else {
        setUser(currentUser);
        const { data } = await axios.get(
          `${import.meta.env.VITE_serverUrl}/logout`,
          { withCredentials: true,}
        );
        console.log(data)
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    createNewUserWithGoogle,
    singIn,
    singInWithGoogle,
    singOut,
    loading,
    profileUpDate,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
