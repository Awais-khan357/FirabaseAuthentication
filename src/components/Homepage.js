// Homepage.jsx
import React, { useState, useEffect } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { lazy } from "react";
import AddModal from "./AddModal";
import "./Homepage.css";

function Homepage() {
  const [booksList, setBooksList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const booksCollectionRef = collection(db, "books");

  function handleClick(id) {
    setModalId(id);
    setShowModal(true);
  }
  async function deleteBook(id) {
    const booksdoc = doc(db, "books", id);
    await deleteDoc(booksdoc);
  }
  async function getBookList() {
    const data = await getDocs(booksCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setBooksList(filteredData);
  }

  useEffect(() => {
    getBookList();
  }, [booksList]);

  return (
    <>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <button
          type="button"
          className="btn btn-primary mb-5"
          onClick={() => handleClick("#staticBackdrop")}
        >
          Add Book
        </button>
      </div>
      <AddModal
        id={modalId}
        show={showModal}
        funct={getBookList}
        onClose={() => setShowModal(false)}
      />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-0">
        {booksList.map((book) => (
          <div className="col mb-4" key={book.id}>
            <div className="card" style={{ width: "15rem" }}>
              <img
                src={book.imageUrl || "default-image-url.jpg"}
                className="card-img-top"
                alt={book.bookName}
                style={{ height: "200px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className="card-body">
                <h5 className="card-title">BookName: {book.bookName}</h5>
                <p className="card-text">Authur Name: {book.Authur}</p>
                <p className="card-text">Release Date: {book.release}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Homepage;
