import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/read");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Handle Save for updating the user
  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/update/${id}`, {
        name: editName,
        email: editEmail,
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, name: editName, email: editEmail } : user
        )
      );
      setEditUserId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle Delete for soft deleting a user
  const handleDelete = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/delete/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditUserId(null);
  };

  return (
    <div className="user-list-container">
      <h2>List of Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {editUserId === user.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Edit Name"
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Edit Email"
                  />
                  <button onClick={() => handleSave(user.id)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (
                <div className="user-item">
                  <span className="item-color">
                    <strong>{user.name}</strong> - {user.email}
                  </span>
                  <div>
                    <button
                      className="edit-button"
                      onClick={() => {
                        setEditUserId(user.id);
                        setEditName(user.name);
                        setEditEmail(user.email);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
