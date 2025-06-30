import React, { useEffect, useState } from 'react'
import '../../styles/admin/allApplications.css'
import axios from 'axios'

const AllApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:6001/fetch-applications");
      setApplications(response.data.reverse());
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="applications-page">
      <h2 className="applications-title">All Applications</h2>

      <div className="applications-container">
        {applications.map((application) => (
          <div className="application-card" key={application._id}>
            <div className="application-content">

              <div className="application-half">
                <h3>{application.title}</h3>
                <p className="app-description">{application.description}</p>

                <div className="skills-section">
                  <h4>Project Skills</h4>
                  <div className="skills-tags">
                    {application.requiredSkills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <p className="budget">Budget: ₹{application.budget}</p>
                <p><b>Client:</b> {application.clientName}</p>
                <p><b>Client ID:</b> {application.clientId}</p>
                <p><b>Email:</b> {application.clientEmail}</p>
              </div>

              <div className="vertical-divider"></div>

              <div className="application-half">
                <div className="proposal-section">
                  <h4>Proposal</h4>
                  <p className="app-description">{application.proposal}</p>
                </div>

                <div className="skills-section">
                  <h4>Freelancer Skills</h4>
                  <div className="skills-tags">
                    {application.freelancerSkills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <p className="budget">Proposed Budget: ₹{application.bidAmount}</p>
                <p><b>Freelancer:</b> {application.freelancerName}</p>
                <p><b>ID:</b> {application.freelancerId}</p>
                <p><b>Email:</b> {application.freelancerEmail}</p>
                <p className={`status-tag ${application.status.toLowerCase()}`}>Status: {application.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApplications
