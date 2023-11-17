import React from "react";
import { db, storage } from "../config";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
function DeletePhoto({ collectionName, photoId, photoName }) {
  const handleDelete = async () => {
    const imageToBeDeletedRef = ref(storage, `${collectionName}/${photoName}`);

    try {
      await deleteDoc(doc(db, collectionName, photoId));
      await deleteObject(imageToBeDeletedRef);
      console.log("image deleted");
    } catch (err) {
      console.error("error", err);
    }
  };
  return (
    <button className="delete-photos" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeletePhoto;
