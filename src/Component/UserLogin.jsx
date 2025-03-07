import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const useremail = useRef(null);
  const userpswd = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiData = await fetch("http://localhost:4000/users");
        const data = await apiData.json();
        setUser(data);
      } catch (error) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!useremail.current || !userpswd.current) {
      console.error("Input references are not set");
      return;
    }

    const emailField = useremail.current.value;
    const pswdField = userpswd.current.value;

    const userDetails = user.find((elem) => elem.emailaddress === emailField);

    if (!userDetails) {
      setError("Invalid email or password");
      useremail.current.style.border = "1px solid red";
      return;
    }

    if ('geetha123'!== pswdField) {
      setError("Incorrect password");
      userpswd.current.style.border = "1px solid red";
      return;
    }

    localStorage.setItem("Id", userDetails.id);
    navigate("/userportal");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter email" ref={useremail} />
      <input type="password" placeholder="Enter password" ref={userpswd} />
      {error && <p className="error">{error}</p>}
      <button type="submit">User Login</button>
    </form>
  );
};

export default UserLogin;
