import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/freelancer/MyProjects.css';

const MyProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      const pros = response.data.filter(pro => pro.freelancerId === localStorage.getItem('userId'));
      setProjects(pros);
      setDisplayProjects([...pros].reverse());
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (value) => {
    if (value === "") {
      setDisplayProjects([...projects].reverse());
    } else {
      setDisplayProjects(
        projects.filter(project => project.status === value).reverse()
      );
    }
  };

  return (
    <div className="freelancer-projects-page">
      <div className="freelancer-projects-container">
        <div className="freelancer-projects-header">
          <h2>My Projects</h2>
          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="freelancer-projects-list">
          {displayProjects.map((project) => (
            <div
              className="freelancer-project-card"
              key={project._id}
              onClick={() => navigate(`/project/${project._id}`)}
            >
              <div className="card-header">
                <h3>{project.title}</h3>
                <span>{new Date(project.postedDate).toDateString()}</span>
              </div>
              <p className="card-description">{project.description}</p>
              <div className="card-footer">
                <div className="footer-item">💰 Budget: ₹{project.budget}</div>
                <div className={`footer-status ${project.status.toLowerCase()}`}>
                  {project.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
