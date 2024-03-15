import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/posts/?cat=${cat}` //get posts that belong to that cat=category. Example cat= art
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {/* Each post */}
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>
            <Link className="link" to={`/post/${post.id}`}>
              Read more
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
