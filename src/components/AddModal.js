import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddModal({ id, onClose, show, funct }) {
  const [authurName, setAuthurName] = useState("");
  const [bookName, setBookName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const booksCollectionRef = collection(db, "books");

  async function handleAdd() {
    const imageRef = ref(storage, `projectImages/${imageFile.name}`);

    // Convert the file to a buffer
    const fileBuffer = await imageFile.arrayBuffer();

    // Upload the file buffer to Firebase Storage
    await uploadBytes(imageRef, fileBuffer);

    // Get image URL from Storage
    const getImageUrl = await getDownloadURL(imageRef);

    // Add book data and image URL to Firestore
    await addDoc(booksCollectionRef, {
      Authur: authurName,
      bookName: bookName,
      release: releaseDate,
      imageUrl: getImageUrl,
    });

    onClose();
    funct();
  }

  return (
    <Modal show={show} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Authur Name"
            onChange={(e) => setAuthurName(e.target.value)}
          />
          <label>Book Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter BookName"
            onChange={(e) => setBookName(e.target.value)}
          />
          <label>Authur Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="Number"
            className="form-control"
            placeholder="Release-year"
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <label>Book Release</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control"
            placeholder="Release-year"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <label>Book Image</label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
