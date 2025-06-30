import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/freelancer/AllProjects.css'

const AllProjects = () => {
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
      const data = response.data.reverse();
      setProjects(data);
      setDisplayProjects(data);

      const uniqueSkills = [];
      data.forEach(project => {
        project.skills.forEach(skill => {
          if (!uniqueSkills.includes(skill)) uniqueSkills.push(skill);
        });
      });
      setAllSkills(uniqueSkills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (categoryFilter.length > 0) {
      setDisplayProjects(projects.filter(project =>
        categoryFilter.every(skill => project.skills.includes(skill))
      ).reverse());
    } else {
      setDisplayProjects(projects.reverse());
    }
  }, [categoryFilter, projects]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter(item => item !== value));
    }
  };

  return (
    <div className="all-projects-container">
      <aside className="filter-sidebar">
        <h2>Filters</h2>
        <div className="filter-divider"></div>
        <div className="skills-filter">
          <h4>Skills</h4>
          {allSkills.length > 0 ? (
            <div className="skills-options">
              {allSkills.map(skill => (
                <label key={skill} className="skill-checkbox">
                  <input type="checkbox" value={skill} onChange={handleCategoryCheckBox} />
                  {skill}
                </label>
              ))}
            </div>
          ) : <p className="no-skills">No skills found</p>}
        </div>
      </aside>

      <main className="projects-list">
        <h2>Available Projects</h2>
        <div className="projects-divider"></div>
        <div className="projects-scroll">
          {displayProjects.length > 0 ? (
            displayProjects.map(project => (
              <div className="project-card" key={project._id} onClick={() => navigate(`/project/${project._id}`)}>
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <span className="project-date">{String(project.postedDate).slice(0, 24)}</span>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-info">
                  <span className="budget">Budget: ₹{project.budget}</span>
                  <span className="bids">{project.bids.length} Bids</span>
                </div>
                <div className="project-skills">
                  {project.skills.map(skill => (
                    <span key={skill} className="skill-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="no-projects">No projects found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllProjects;
