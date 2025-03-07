import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const adminemail = useRef(null);
  const adminpswd = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!adminemail.current || !adminpswd.current) {
      console.error("Input references are not set");
      return;
    }

    const emailVal = adminemail.current.value;
    const pswdVal = adminpswd.current.value;

    const credential = {
      email: "admin@gmail.com",
      password: "admin123",
    };

    if (!emailVal) {
      setError("Email is required");
      adminemail.current.style.border = "1px solid red";
      return;
    }
    if (!pswdVal) {
      setError("Password is required");
      adminpswd.current.style.border = "1px solid red";
      return;
    }

    if (emailVal === credential.email && pswdVal === credential.password) {
      navigate('/adminportal');
    } else {
      setError("Invalid email or password");
      adminemail.current.style.border = "1px solid red";
      adminpswd.current.style.border = "1px solid red";
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <input type="text" placeholder="Enter email" ref={adminemail} />
      <input type="password" placeholder="Enter password" ref={adminpswd} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Admin Login</button>
    </form>
  );
};

export default AdminLogin;
