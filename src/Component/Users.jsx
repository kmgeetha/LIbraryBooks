import React, { useEffect, useState } from "react";
import "../Styles/users.css";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]); // Corrected variable name to plural for clarity
  const loc = useLocation();
  const path = loc.pathname.startsWith("/adminportal");
  const  navigate =useNavigate();
  // Fetch users from API
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch("http://localhost:4000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    fetchApi();
  }, [users]);

  console.log(users);
  
  // Handle delete user
  const handleDelete = async (id, firstname) => {
    const confirmDelete = window.confirm(
      `Do you want to delete ${firstname}'s information?`
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        alert(`${firstname}'s information has been deleted.`);
        // Refresh the users list after deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error.message);
        alert("Failed to delete user.");
      }
    } else {
      alert("User information is not deleted.");
    }
  };

  const  handleadduser=()=>{
    navigate('/adminportal/addusers');
  }
  return (
    <div className="users">
      <div className="header">
        <h1>Users</h1>
        <button className="adduser" onClick={handleadduser}> Add User </button>
      </div>
      <div className="table">
        <table border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Place</th>
              <th>DOB</th>
              {path && <th>Password</th>}
              {path && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => {
                const {
                  id,
                  firstname,
                  lastname,
                  emailaddress,
                  phoneno,
                  place,
                  dateofbirth,
                } = user;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      {firstname} {lastname}
                    </td>
                    <td>{emailaddress}</td>
                    <td>{phoneno}</td>
                    <td>{place}</td>
                    <td>{dateofbirth}</td>
                    {path && <td>geetha123</td>}
                    {path && (
                      <td>
                        <button
                          onClick={() => handleDelete(id, firstname)}
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                          className="button"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={path ? 8 : 6} style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
