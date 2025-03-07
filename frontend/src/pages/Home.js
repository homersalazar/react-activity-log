import React, { useState, useEffect } from "react";
import profile from "../assets/profile.png";
import axios from "axios";
import Swal from "sweetalert2";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);

  const [postText, setPostText] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);

  // fetching of post with a limit of 2
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, [limit]);

  const handleEditPost = (post) => {
    setEditingPostId(post.id);
    setEditedText(post.body); // Set the textarea with the existing post text
  };

  // creating post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { body: postText };
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        newItem
      );

      // Fetch the posts again to get the last ID
      const updatedPosts = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      const lastPostId = updatedPosts.data[0].id;

      const loggers = {
        subject_type: "Posts",
        event: "Created",
        subject_id: lastPostId,
        causer_id: 1,
        properties: postText,
      };
      await axios.post(`http://localhost:3002/activity/log`, loggers);

      setPosts([response.data, ...posts]);
      setPostText("");
    } catch (error) {
      console.log(error);
    }
  };

  // edit post
  const handleEdit = async (e, id) => {
    e.preventDefault();
    try {
      const postResponse = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const postData = postResponse.data;

      const loggers = {
        subject_type: "Posts",
        event: "Updated",
        subject_id: id,
        causer_id: 1,
        properties: JSON.stringify({
          old: postData,
          new: { body: editedText },
        }),
      };
      await axios.post(`http://localhost:3002/activity/log`, loggers);

      const updatedPost = { ...postData, body: editedText };
      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        updatedPost
      );

      setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
      setEditingPostId(null);
      setEditedText("");
      Swal.fire({
        title: "Updated!",
        text: "Your file has been updated.",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete post
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Fetch the post data before deleting
        const postResponse = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const postData = postResponse.data;

        // Store the post details in the activity log before deletion
        const loggers = {
          subject_type: "Posts",
          event: "Deleted",
          subject_id: id,
          causer_id: 1,
          properties: JSON.stringify(postData),
        };
        await axios.post(`http://localhost:3002/activity/log`, loggers);

        // Delete the post
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        // Remove the deleted post from the state
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
      <div className="bg-white p-4 rounded-xl shadow-md mb-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
            rows="4"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
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
                    <button onClick={() => handleEditPost(post)}>
                      <Pencil /> Edit post
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleDelete(post.id)}>
                      <Trash2 /> Move to trash
                    </button>
                  </li>
                </ul>
              </details>
            </div>

            {editingPostId === post.id ? (
              <form onSubmit={(e) => handleEdit(e, post.id)}>
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="What's on your mind?"
                  rows="4"
                  name="body"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                ></textarea>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Update post
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-gray-700">{post.body}</p>
            )}
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
