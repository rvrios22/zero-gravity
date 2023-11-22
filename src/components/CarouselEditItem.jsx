import React, { useState } from "react";
import { db, storage } from "../config";
import { ref, deleteObject } from "firebase/storage";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

function CarouselEditItem({ alt, desc, id, source }) {
  const [textDesc, setTextDesc] = useState(desc);

  const handleDeleteSlide = async (id) => {
    //gets refs to storage and database for deletion simultaniously
    const itemToDelete = doc(db, "carouselImages", id);
    const photoToDelete = ref(storage, `galleryImages/${photoName}`);
    try {
      await deleteDoc(itemToDelete);
      await deleteObject(photoToDelete);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTextChange = (e) => {
    setTextDesc(e.target.value);
  };

  const handleUpdateItem = async (id) => {
    const itemDoc = doc(db, "carouselImages", id);
    try {
      await updateDoc(itemDoc, {
        desc: textDesc,
        source: source,
        alt: alt,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img src={source} alt={alt} />
      <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        value={textDesc}
        onChange={handleTextChange}
        className="carousel-textarea"
      ></textarea>
      <div className="flex-space-between">
        <button
          onClick={() => handleUpdateItem(id)}
          className="carousel-edit-button"
        >
          Submit
        </button>
        <button onClick={() => handleDeleteSlide(id)} className="delete-photos">
          DELETE ITEM
        </button>
      </div>
    </div>
  );
}

export default CarouselEditItem;
