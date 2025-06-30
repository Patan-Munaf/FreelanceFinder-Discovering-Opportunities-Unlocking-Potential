import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../styles/admin/Admin.css'

const Admin = () => {
  const navigate = useNavigate();

  const [projectsCount, setProjectsCount] = useState(0);
  const [completedProsCount, setCompletedProsCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchProjects();
    fetchApplications();
    fetchUsers();
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-projects");
      setProjectsCount(response.data.length);
      const comPros = response.data.filter((pro) => pro.status === "Completed");
      setCompletedProsCount(comPros.length);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      setApplicationsCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-users");
      setUsersCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => navigate('/admin-projects')}>
          <h4>All Projects</h4>
          <p>{projectsCount}</p>
          <button>View Projects</button>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/admin-projects')}>
          <h4>Completed Projects</h4>
          <p>{completedProsCount}</p>
          <button>View Projects</button>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/admin-applications')}>
          <h4>Applications</h4>
          <p>{applicationsCount}</p>
          <button>View Applications</button>
        </div>
        <div className="dashboard-card" onClick={() => navigate('/all-users')}>
          <h4>Users</h4>
          <p>{usersCount}</p>
          <button>View Users</button>
        </div>
      </div>
    </div>
  )
}

export default Admin
