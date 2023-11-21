import React, { useState } from "react";
import { db } from "../config";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";

function CarouselEditItem({ alt, desc, id, source }) {
  const [textDesc, setTextDesc] = useState(desc);

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleTextChange = (e) => {
    setTextDesc(e.target.value);
  };

  const handleUpdateItem = async (id) => {
    const itemDoc = doc(db, "caourselImages", id);
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
        rows="10"
        value={textDesc}
        onChange={handleTextChange}
      ></textarea>
      <button onClick={handleUpdateItem}>Submit</button>
    </div>
  );
}

export default CarouselEditItem;
