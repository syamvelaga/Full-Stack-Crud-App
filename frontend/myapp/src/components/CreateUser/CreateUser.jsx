import React, { useState } from "react";
import axios from "axios";
import "./CreateUser.css"; // Component-specific styles

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/create", {
        name,
        email,
      });
      setMessage(response.data.message); // Set success message
      setName(""); // Clear input fields
      setEmail("");
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="create-user-container">
      <h2>Create User</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateUser;
