import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/admin/AdminProjects.css'

const AdminProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-projects');
      setProjects(response.data);
      setDisplayProjects([...response.data].reverse());

      // extract all unique skills
      const skillsSet = new Set();
      response.data.forEach(project =>
        project.skills.forEach(skill => skillsSet.add(skill))
      );
      setAllSkills([...skillsSet]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      const filtered = projects.filter(project =>
        categoryFilter.every(skill => project.skills.includes(skill))
      ).reverse();
      setDisplayProjects(filtered);
    } else {
      setDisplayProjects([...projects].reverse());
    }
  }, [categoryFilter, projects]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter(skill => skill !== value));
    }
  };

  return (
    <div className="admin-projects-page">
      <h2 className="projects-title">All Projects</h2>

      <div className="filters-section">
        <h4>Filter by Skills</h4>
        <div className="filters-container">
          {allSkills.map(skill => (
            <label key={skill} className="filter-option">
              <input
                type="checkbox"
                value={skill}
                onChange={handleCategoryCheckBox}
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {displayProjects.map(project => (
          <div className="project-card" key={project._id}>
            <div className="project-header">
              <h3>{project.title}</h3>
              <p className="date">{new Date(project.postedDate).toLocaleDateString()}</p>
            </div>

            <p className="description">{project.description}</p>

            <div className="skills-tags">
              {project.skills.map(skill => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>

            <div className="project-info">
              <p><strong>Budget:</strong> ₹ {project.budget}</p>
              <p><strong>Client:</strong> {project.clientName} ({project.clientEmail})</p>
              <p><strong>Bids:</strong> {project.bids.length}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${project.status.toLowerCase()}`}>{project.status}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProjects
