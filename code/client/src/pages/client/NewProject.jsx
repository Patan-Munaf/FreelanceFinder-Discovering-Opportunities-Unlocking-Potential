import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/client/newProject.css';

const NewProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);
  const [skills, setSkills] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:6001/new-project", {
        title, description, budget, skills,
        clientId: localStorage.getItem('userId'),
        clientName: localStorage.getItem('username'),
        clientEmail: localStorage.getItem('email')
      });
      alert("New project added!");
      setTitle('');
      setDescription('');
      setBudget(0);
      setSkills('');
      navigate('/client');
    } catch (err) {
      alert("Operation failed!");
    }
  }

  return (
    <div className="new-project-page">
      <div className="new-project-card">
        <h2>Post New Project</h2>
        <p>Share your project details to connect with the best freelancers</p>

        <div className="new-project-form">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              placeholder="Enter your project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Describe your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget (in ₹)</label>
              <input
                type="number"
                placeholder="5000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Required Skills <span className="hint">(comma-separated)</span></label>
              <input
                type="text"
                placeholder="e.g. React, Node.js"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSubmit}>Submit Project</button>
        </div>
      </div>
    </div>
  )
}

export default NewProject
