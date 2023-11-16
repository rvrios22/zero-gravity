import React from "react";
import { db, storage } from "../config";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
function DeletePhoto({ photoId, photoName }) {
  const handleDelete = async () => {
    const imageToBeDeletedRef = ref(storage, `galleryImages/${photoName}`);

    try {
      await deleteDoc(doc(db, "galleryImages", photoId));
      await deleteObject(imageToBeDeletedRef);
      console.log("image deleted");
    } catch (err) {
      console.error("error", err);
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}

export default DeletePhoto;
