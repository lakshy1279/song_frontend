import React, { Component, useState, useEffect } from "react";
import { useHistory } from "react-router";

const Upload = (props) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [image, setImage] = useState("");
  const [language, setLanguage] = useState("");
  const [video, setVideo] = useState("");
  const [imagedata, setImagedata] = useState("");
  const [videodata, setVideodata] = useState("");
  const [wait, setWait] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (imagedata && videodata) {
      //console.log('hook',imagedata,videodata);
      fetch("https://backendvideoplayer.herokuapp.com/upload", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieName: title,
          releaseDate: year,
          thumbnail: imagedata,
          language,
          video: videodata,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          }
          history.push("/");
          console.log(data);
          props.fetch();
        });
    }
  }, [imagedata, videodata]);

  const handleImage = () => {
    const data = new FormData();
    //console.log("image",image)
    data.append("file", image);
    //data.append("file",video)
    data.append("upload_preset", "instaClone");
    data.append("cloud_name", "aditya-foundation");
    fetch("https://api.cloudinary.com/v1_1/lakshy/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //////////// you can use both the login by using useeffect
        //console.log('image',data.url);
        setImagedata(data.url);
        //fetchAPI(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVideo = () => {
    const data = new FormData();
    //console.log("video",video)
    data.append("file", video);
    data.append("upload_preset", "instaClone");
    data.append("cloud_name", "aditya-foundation");
    fetch("https://api.cloudinary.com/v1_1/lakshy/video/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        //////////// you can use both the login by using useeffect
        //console.log('video',data);
        setVideodata(data.url);
        //fetchAPI(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async () => {
    console.log(image.type);
    console.log(image);
    if (
      title &&
      image &&
      language &&
      video &&
      year &&
      image.type === "image/jpeg"
    ) {
      setWait("Please Wait while Uploading");
      await handleImage();
      await handleVideo();
    } else {
      alert("Please provide all property with proper formate");
      setWait("");
      setTitle("");
      setLanguage("");
      setYear("");
    }
  };

  return (
    <form className="login-form">
      <span className="login-signup-header">Song Details</span>
      <div className="field">
        <input
          type="text"
          placeholder="Song name"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="Song Year"
          value={year}
          required
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="field">
        <span className="details">Upload Image</span>
        <input
          type="file"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <div className="field">
        <input
          type="text"
          placeholder="Language"
          value={language}
          required
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>
      <div className="field">
        <span className="details">Upload Video</span>
        <input
          type="file"
          required
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </div>
      {wait ? (
        <div className="field">
          <button disabled={wait}>Upload</button>
        </div>
      ) : (
        <div className="field">
          <button onClick={handleSubmit}>Upload</button>
        </div>
      )}
    </form>
  );
};

export default Upload;
