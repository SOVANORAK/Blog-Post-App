/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Write = () => {
  //Use state to show old data in form
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  //Upload Image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //HandleClick
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = upload();

    // try {
    //   await
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibality: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="art"
              checked={cat === "art"}
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="science"
              checked={cat === "science"}
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="technology"
              checked={cat === "technology"}
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="cinema"
              checked={cat === "cinema"}
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="design"
              checked={cat === "design"}
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              name="cat"
              value="food"
              checked={cat === "food"}
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
