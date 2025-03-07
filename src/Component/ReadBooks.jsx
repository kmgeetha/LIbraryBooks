import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/readbooks.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const ReadBooks = () => {
  let { id: bookId } = useParams();
  let navigate = useNavigate();
  let [book, setBook] = useState([]);
  let [value, setValue] = useState({});
  let [short, setShort] = useState(true);
  let [long, setLong] = useState(true);

  useEffect(() => {
    const fetchBookApi = async () => {
      try {
        const response = await fetch("http://localhost:4000/books");
        if (!response.ok) {
          throw new Error(`Network error: ${response.statusText}`);
        }
        const data = await response.json();
        setBook(data);
        const bookFound = data.find((item) => item.id === bookId);
        setValue(bookFound || null);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchBookApi();
  }, [bookId]);

  return (
    <div className="readbook">
      <button className="backbtn" onClick={() => navigate(-1)}>
        <KeyboardBackspaceIcon /> Back
      </button>
      {value ? (
        <div className="readbookbody">
          <img src={value.thumbnailUrl} alt="book cover" className="book-img" />
          <div className="container">
            <h1>{value.title}</h1>

            <div className="short">
              <div className="head" onClick={() => setShort(!short)}>
                <div className="title">Short Description</div>
                <div className="title">
                  {short ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </div>
              </div>
              {!short && <p className="para">{value.shortDescription}</p>}
            </div>

            <div className="long">
              <div className="head" onClick={() => setLong(!long)}>
                <div className="title">Long Description</div>
                <div className="title">
                  {long ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </div>
              </div>
              {!long && <p className="para">{value.longDescription}</p>}
            </div>
          </div>
        </div>
      ) : (
        <p className="loading">Loading book information...</p>
      )}
    </div>
  );
};

export default ReadBooks;
