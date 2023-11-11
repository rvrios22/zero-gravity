import React, { useState, useRef } from "react";
import { storage, db } from "../config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "../css/gallery.css";

function GalleryUploader() {
  const [imageFile, setImageFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState("");
  const [isImageURLEmpty, setIsImageURLEmpty] = useState(true);
  const imageInputRef = useRef(null);

  const handleImageInputReset = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
      imageInputRef.current.type = "text";
      imageInputRef.current.type = "file";
    }
  };

  const addImageToDatabase = async () => {
    if (!imageName || !imageURL) return;
    try {
      console.log("database function called");
      await addDoc(collection(db, "galleryImages"), {
        alt: imageName,
        source: imageURL,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsImageURLEmpty(true);
      handleImageInputReset();
      setImageFile("");
      setPercent(0);
      setImageURL("");
      setImageName("");
    }
  };

  const handleImageInputChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!imageFile) return alert("Please choose a file to upload");
    if (!imageName) return alert("Please add a name for your image");
    const imageToBeUploadedRef = ref(
      storage,
      `galleryImages/${imageFile.name}`
    );
    const uploadImage = uploadBytesResumable(imageToBeUploadedRef, imageFile);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        let percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.error(err),
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          setImageURL(url);
          //   need this line to be false to wait for imageURL state to update
          if (!imageURL) {
            setIsImageURLEmpty(false);
          }
        });
      }
    );
  };

  if (isImageURLEmpty == false) {
    setIsImageURLEmpty(true);
    console.log("if statement called");
    addImageToDatabase();
  }

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="img">Upload An Image: </label>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/jpg"
        onChange={handleImageInputChange}
        ref={imageInputRef}
      />
      <input type="submit" onClick={handleUpload} />

      {percent && <p>{percent}% Uploaded</p>}
      <label htmlFor="name">Image Name: </label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleImageNameChange}
        value={imageName}
      />
    </div>
  );
}

export default GalleryUploader;
