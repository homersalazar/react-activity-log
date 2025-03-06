import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import axios from "axios";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, [limit]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
      <div className="bg-white p-4 rounded-xl shadow-md mb-5">
        <form
          // onSubmit={handleSubmit}
          className="space-y-4"
        >
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
            rows="4"
            // value={postText}
            // onChange={(e) => setPostText(e.target.value)}
          ></textarea>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <img
                  src={profile}
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">Morty</h2>
                  <p className="text-sm text-gray-500">Just now</p>
                </div>
              </div>
              <details className="dropdown">
                <summary className="btn p-0 bg-transparent hover:bg-transparent shadow-none border-none">
                  <Ellipsis />
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <a>
                      <Pencil /> Edit post
                    </a>
                  </li>
                  <li>
                    <a>
                      <Trash2 /> Move to trash
                    </a>
                  </li>
                </ul>
              </details>
            </div>

            <p className="text-gray-700">{post.body}</p>
            <div className="flex space-x-4 mt-2 text-gray-500">
              <button className="hover:text-blue-500">Like</button>
              <button className="hover:text-blue-500">Comment</button>
              <button className="hover:text-blue-500">Share</button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setLimit(limit + 2)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
      >
        Load More Posts
      </button>
    </div>
  );
};

export default Home;
