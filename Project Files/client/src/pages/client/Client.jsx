import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/client/client.css'
import { useNavigate } from 'react-router-dom'

const Client = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [filterProject, setFilterProject] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:6001/fetch-projects');
      let pros = res.data.filter(pro => pro.clientId === localStorage.getItem('userId'));
      setProjects(pros);
      setDisplayProjects(pros.reverse());
    } catch (err) {
      console.error(err);
      fetchProjects();
    }
  }

  const handleFilterChange = (data) => {
    if (data === "") {
      setDisplayProjects(projects);
    } else if (data === "Un Assigned") {
      setDisplayProjects(projects.filter(p => p.status === "Available").reverse());
    } else if (data === "In Progress") {
      setDisplayProjects(projects.filter(p => p.status === "Assigned").reverse());
    } else if (data === "Completed") {
      setDisplayProjects(projects.filter(p => p.status === "Completed").reverse());
    }
  }

  return (
    <div className="client-projects-page">
      <div className="client-projects-list">
        <div className="client-projects-header">
          <h2>My Projects</h2>
          <select onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="">Filter by Status</option>
            <option value="Un Assigned">Un Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <hr />

        {displayProjects.map((project) => (
          <div
            className="listed-project fade-in"
            key={project._id}
            onClick={() => navigate(`/client-project/${project._id}`)}
          >
            <div className='listed-project-head'>
              <h3>{project.title}</h3>
              <p>{String(project.postedDate).slice(0, 25)}</p>
            </div>
            <h5>Budget - ₹ {project.budget}</h5>
            <p>{project.description}</p>
            <div className="bids-data">
              <h6>Status - {project.status}</h6>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Client
