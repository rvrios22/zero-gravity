import React from "react";
import { db, storage } from "../config";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
function DeletePhoto({ photoId, photoName }) {
  const handleDelete = async () => {
    try {
        await deleteDoc(db, 'galleryImages', photoId)
        console.log('image deleted')
    } catch (err) {
      console.error("error", err);
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}

export default DeletePhoto;
