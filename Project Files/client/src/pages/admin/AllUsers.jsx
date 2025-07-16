import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/admin/allUsers.css'

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-users");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="all-users-page">
      <h2 className="users-title">All Users</h2>

      <div className="users-container">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <div className="user-row">
              <span className="label">User ID</span>
              <p className="value">{user._id}</p>
            </div>
            <div className="user-row">
              <span className="label">Username</span>
              <p className="value">{user.username}</p>
            </div>
            <div className="user-row">
              <span className="label">Email</span>
              <p className="value">{user.email}</p>
            </div>
            <div className="user-row">
              <span className="label">User Role</span>
              <p className={`role-badge ${user.usertype.toLowerCase()}`}>{user.usertype}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllUsers
