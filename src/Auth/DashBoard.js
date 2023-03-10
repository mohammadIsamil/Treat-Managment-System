import React, { useState, useEffect, useContext } from "react";
import firebase from "../Config/FireBase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Header from "../Components/Header";
import { userContext } from "../App";

const DashBoard = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  const context = useContext(userContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const email = localStorage.getItem('userEmail');
        context.setUserEmail(email);
      } else {
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, navigate]);

  return (
    <>
      <Header />
      <div className="home" style={{ borderRadius: "10px", margin: "1em" }}>
        <h2>Welcome, {user?.displayName}</h2>
        {user && <Landing data={data} />}
      </div>
    </>
  );
};

export default DashBoard;