import React, { useState } from "react";
import { storage, db } from "../config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

function GalleryUploader() {
  const [imageFile, setImageFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [imageName, setImageName] = useState("");
  const [isImageURLEmpty, setIsImageURLEmpty] = useState("");

  const addImageToDatabase = async () => {
    try {
      await addDoc(collection(db, "galleryImages"), {
        alt: imageName,
        source: imageURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageInputChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!imageFile) alert("Please choose a file to upload");
    if (!imageName) alert("Please add a name for your image");
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
          console.log(url);
          setImageURL(url);
          if (!imageURL) {
            setIsImageURLEmpty(true);
          }
        });
      }
    );
  };

  if (isImageURLEmpty) {
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
      />
      <button type="submit" onClick={handleUpload}>
        Upload
      </button>
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
