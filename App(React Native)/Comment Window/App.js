import React, { useState } from "react";
import "./styles.css"; // Make sure to create a CSS file for styles

const App = () => {
  const [comments, setComments] = useState([
    {
      username: "babyyouraki",
      text: "A little Maple Puppy appreciation post to sweeten your day! ❤️",
      date: "2024-01-23",
    },
    {
      username: "tiff.cook24",
      text: "They’re always meant to find each other! 🥰",
      date: "2024-01-22",
    },
    {
      username: "masterchong",
      text: "Omg baby animals are sooo adorable! 😍",
      date: "2024-01-21",
    },
  ]);

  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      username,
      text: commentText,
      date: new Date().toLocaleDateString(),
    };
    setComments([...comments, newComment]);
    setUsername("");
    setCommentText("");
  };

  return (
    <div className="container">
      <div className="video-section">
        <video controls>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        <div id="commentsContainer">
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <h3>{comment.username}</h3>
              <p>{comment.text}</p>
              <div className="comment-info">{comment.date}</div>
            </div>
          ))}
        </div>
        <div className="likes">7,238 likes</div>

        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
            required
          />
          <textarea
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Post Comment</button>
        </form>
      </div>
    </div>
  );
};

export default App;
