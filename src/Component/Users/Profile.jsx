import React, { useEffect, useState } from "react";
import i1 from "../../Images/profile.png";
import "../../Styles/profile.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [presentuser, setPresentUser] = useState(null);
  const userId = localStorage.getItem("Id");
  const [cart,setCart] =useState([])
   const navigate= useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const apiData = await response.json();
      setUser(apiData);

      // Find the current user
      const user1 = apiData.find((item) => item.id === userId);
      if (user1) {
        setPresentUser(user1);

      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [cart]);


  const updateCartInBackend = async (updatedCart) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Cart: updatedCart,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the cart");
      }
      alert("Cart updated successfully....!");
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(`Do you want to delete "${title}"?`);
    if (confirmDelete) {
      try {
        // Filter out the book from the cart
        const updatedCart = presentuser.Cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        updateCartInBackend(updatedCart);

      } catch (error) {
        console.error("Error deleting book:", error.message);
        alert("Failed to delete the book.");
      }
    } else {
      alert("Book was not deleted.");
    }
  };
  
  const handleCart=(id)=>{
    navigate(`/userportal/readbooks/${id}`);
  }

  return (
    <div className="profile"> 
      <div className="container">
        <div className="box">
          {presentuser ? (
            <>
          <div className="cart-details">
            <div className="details">
              <img className="pic" src={i1} alt="profile" />
                <div className="content">
                  <p className="name" >Name </p>
                  <p>
                    {presentuser.firstname}  {presentuser.lastname}
                  </p>
                </div>
                <div className="content" >
                  <p className="name"> Date of birth </p>
                  <p>{presentuser.dateofbirth}</p>
                </div>
                <div className="content">
                  <p className="name"> Email Address </p>
                  <p>{presentuser.emailaddress} </p>
                </div>
                <div className="content">
                  <p className="name"> Phone Number </p>
                  <p>{presentuser.phoneno} </p>
                </div>
              </div>
            </div>
            <div className="cart1" >
              <h1> Cart details </h1>
                <div>
                  {presentuser.Cart.map((item)=>{
                    return(
                    <div className="cart">
                      <h2 className="name"><i>Book Title :</i> {item.title} </h2>
                      <div className="book"> 
                      <img src={item.thumbnailUrl}  alt="book photo" onClick={()=>{handleCart(item.id)}}  />
                      <button className="but" onClick={()=> handleDelete(item.id,item.title)}> Remove </button>
                      </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          ) : (
            <div> Loading </div>
          )}
        </div>
      </div>
    </div>
  );
}
