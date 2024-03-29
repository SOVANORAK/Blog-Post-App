/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Man from "../img/man.png";
import Menu from "../components/Menu";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const pathName = location.pathname;
  const postId = pathName.split("/")[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //Fetching single Data from Posts Table
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/${postId}`
        );
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [postId]);

  //Handle Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //html
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post.img}`} />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="User Profile" />}

          <div className="info">
            <span>Owned by: {post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit`} state={post}>
                <img src={Edit} alt="edit" />
              </Link>
              <img src={Delete} alt="delete" onClick={handleDelete} />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {/* React quill we dont need p tag */}
        {getText(post.desc)}
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
