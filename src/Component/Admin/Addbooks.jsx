import React, { useRef } from "react";
import "../../Styles/addbooks.css";

const Addbooks = () => {
  const bookTitle = useRef(null);
  const imageUrl = useRef(null);
  const authorname = useRef(null);
  const status = useRef(null);
  const pcount = useRef(null);
  const categerios = useRef(null);
  const isbn = useRef(null);
  const short = useRef(null);
  const long = useRef(null);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (isValid()) {
        const newBook = {
          title: bookTitle.current.value,
          thumbnailUrl: imageUrl.current.value,
          authors: [authorname.current.value],
          status: status.current.value,
          pageCount: pcount.current.value,
          categories: [categerios.current.value],
          isbn: isbn.current.value,
          shortDescription: short.current.value,
          longDescription: long.current.value,
        };

        await fetch(`http://localhost:4000/books`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        });

        alert("Book Added Successfully...!");

        // Clear input fields
        bookTitle.current.value = "";
        imageUrl.current.value = "";
        authorname.current.value = "";
        status.current.value = "";
        pcount.current.value = "";
        categerios.current.value = "";
        isbn.current.value = "";
        short.current.value = "";
        long.current.value = "";
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const isValid = () => {
    if (!bookTitle.current.value) {
      alert("Title is required");
      return false;
    }
    if (!authorname.current.value) {
      alert("Author name is required");
      return false;
    }
    if (!status.current.value) {
      alert("Status is required");
      return false;
    }
    if (!pcount.current.value) {
      alert("Page count is required");
      return false;
    }
    if (!categerios.current.value) {
      alert("Categories are required");
      return false;
    }
    if (!isbn.current.value) {
      alert("ISBN is required");
      return false;
    }
    if (!short.current.value) {
      alert("Short description is required");
      return false;
    }
    if (!long.current.value) {
      alert("Long description is required");
      return false;
    }
    return true;
  };

  return (
    <div className="addbooks">
      <div className="container">
        <div className="form-con">
          <h1>Add Books</h1>
          <form onSubmit={handlesubmit}>
            <label>Enter Book Title</label>
            <input
              className="input-field"
              ref={bookTitle}
              type="text"
              placeholder="Enter Book Name"
            />
            <label>Enter Image URL</label>
            <input
              className="input-field"
              ref={imageUrl}
              type="text"
              placeholder="Enter Image URL"
            />
            <label>Enter Author's Name</label>
            <input
              className="input-field"
              ref={authorname}
              type="text"
              placeholder="Enter Author Name"
            />
            <label>Enter Status of the Book</label>
            <input
              className="input-field"
              ref={status}
              type="text"
              placeholder="Enter Status of Book"
            />
            <label>Enter Page Count of the Book</label>
            <input
              className="input-field"
              ref={pcount}
              type="number"
              placeholder="Enter Page Count of Book"
            />
            <label>Enter Categories of the Book</label>
            <input
              className="input-field"
              ref={categerios}
              type="text"
              placeholder="Enter Categories of Book"
            />
            <label>Enter ISBN of the Book</label>
            <input
              className="input-field"
              ref={isbn}
              type="number"
              placeholder="Enter ISBN of Book"
            />
            <label>Enter Short Description of the Book</label>
            <input
              className="input-field"
              ref={short}
              type="text"
              placeholder="Enter Short Description"
            />
            <label>Enter Long Description of the Book</label>
            <textarea
              className="textarea-field"
              ref={long}
              placeholder="Enter Long Description"
              style={{
                width: "65%",
                height: "150px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                fontSize: "16px",
                resize: "vertical",
              }}
            />
            <button className="but1" type="submit">
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addbooks;
