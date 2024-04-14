import React, { useState } from "react";
import axios from "axios";
// import dotenv from "dotenv";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [vidVisible, setVidVisible] = useState(false);
  const [imgVisible, setImgVisible] = useState(false);
  const [image, setImage] = useState();
  const [video, setVideo] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      if (response.data.resource_type === "image") {
        setVidVisible(false);
        setImgVisible(true);
        setImage(response.data.url);
      } else if (response.data.resource_type === "video") {
        setImgVisible(false);
        setVidVisible(true);
        setVideo(response.data.url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imgVisible && (
        <img src={image} alt="Uploaded" height={300} width={200} />
      )}
      {vidVisible && (
        <video src={video} alt="Uploaded" height={300} width={200} autoPlay />
      )}
    </div>
  );
};

export default UploadForm;


