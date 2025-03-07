import React, { useState, useEffect } from "react";
import "../Styles/books.css";
import { useLocation, useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/adminportal");

  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
 
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem("Id");
  const [presentuser, setPresentUser] = useState(null);
  const [cart, setCart] = useState([]); // Initialize as an empty array

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:4000/books");
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error.message);
    }
  };

  // Fetch users and find current user
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
        setCart(user1.Cart || []); // Ensure cart is an array
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchUsers();
  }, []);

  // Update the user's cart in the backend
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

  // Add to cart handler
  const handleAddCart = async (bookId) => {
    const bookToAdd = books.find((item) => item.id === bookId);
    if (!bookToAdd) return;

    // Update the cart state
    const updatedCart = [...cart, bookToAdd];
    setCart(updatedCart);
    // Update the cart in the backend
    updateCartInBackend(updatedCart);

  };

  // Read book handler
  const readBooks = (id) => {
    const route = isAdmin
      ? `/adminportal/readbooks/${id}`
      : `/userportal/readbooks/${id}`;
    navigate(route);
  };

  // Delete book handler
  const handleDelete = async (id, title) => {
    const confirmDelete = window.confirm(`Do you want to delete "${title}"?`);
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:4000/books/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete the book");
        }
        alert(`${title} has been deleted.`);
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error.message);
        alert("Failed to delete the book.");
      }
    } else {
      alert("Book was not deleted.");
    }
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="booksConatiner" >
    <div className="books">
      <div className="header">
        <h1>Library Books</h1>
    </div>
      {currentBooks.map((book) => {
        const { id, title, authors, status, isbn, pageCount, thumbnailUrl, categories } = book;
        return (
          <div className="book" key={id}>
            <div className="container">
              <div className="img">
                <img className="pic" src={thumbnailUrl} alt={`${title} Thumbnail` } />
              </div>
              <div style={{width:'100%'}} >
              <table>
                <tr>
                  <th> Title </th>
                  <td>{title} </td>
                </tr>
                <tr>
                  <th>authors </th>
                  <td>{authors.map((item,index)=>{
                      return(
                        <p>{ index<=5 ? item :""}</p>
                      )
                  })} </td>
                </tr>
                <tr>
                  <th>pageCount </th>
                  <td>{pageCount}</td>
                </tr>
                <tr>
                  <th>Catagerios </th>
                  <td> {categories} </td>
                </tr>
              </table>
              <div className="buttons">
                  <button className="btn1" onClick={() => readBooks(id)}>
                    Read Book
                  </button>
                  {isAdmin ? (
                    <button className="btn2" onClick={() => handleDelete(id, title)}>
                      Delete
                    </button>
                  ) : (
                    <button className="btn2" onClick={() => handleAddCart(id)}>
                      Add to Favorites
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Books;
