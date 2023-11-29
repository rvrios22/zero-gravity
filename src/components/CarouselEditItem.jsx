import React, { useState } from "react";
import { db, storage } from "../config";
import { ref, deleteObject } from "firebase/storage";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import ClearIcon from "@mui/icons-material/Clear";
import CarouselImageUploader from "./CarouselImageUploader";

function CarouselEditItem({
  alt,
  desc,
  id,
  source,
  photoName,
  setDidImageUpload,
  isImageDeleted,
  setIsImageDeleted,
}) {
  const [textDesc, setTextDesc] = useState(desc);

  const handleDeleteSlide = async (id) => {
    //gets refs to storage and database for deletion simultaniously
    const itemToDelete = doc(db, "carouselImages", id);
    const photoToDelete = ref(storage, `carouselImages/${photoName}`);
    try {
      await deleteDoc(itemToDelete);
      await deleteObject(photoToDelete);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePhotoFromSlide = async (id) => {
    const itemDoc = doc(db, "carouselImages", id);
    const photoToDelete = ref(storage, `carouselImages/${photoName}`);
    try {
      await deleteObject(photoToDelete);
      await updateDoc(itemDoc, {
        source: "",
        alt: "",
        name: "",
      });
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
      {source ? (
        <div className="edit-photo-container">
          <button
            onClick={() => handleDeletePhotoFromSlide(id)}
            className="edit-delete-photo"
          >
            <ClearIcon />
          </button>
          <img src={source} alt={alt} />
        </div>
      ) : (
        <CarouselImageUploader
          collectionName="carouselImages"
          setDidImageUpload={setDidImageUpload}
          isImageDeleted={isImageDeleted}
          setIsImageDeleted={setIsImageDeleted}
          id={id}
        />
      )}

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
