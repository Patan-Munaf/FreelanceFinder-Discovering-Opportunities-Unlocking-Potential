import React, { useContext, useEffect, useState } from 'react'
import '../../styles/client/ProjectWorking.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../../context/GeneralContext';

const ProjectWorking = () => {
  const {socket} = useContext(GeneralContext);
  const params = useParams();
  const [project, setProject] = useState();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState();

  useEffect(()=>{
    fetchProject(params['id']);
    joinSocketRoom();
    fetchChats();

    socket.on("message-from-user", ()=> {
      fetchChats();
    });
  },[]);

  const joinSocketRoom = async() =>{
    await socket.emit("join-chat-room", {projectId: params['id'], freelancerId: ""});
  }

  const fetchProject = async(id) =>{
    await axios.get(`http://localhost:6001/fetch-project/${id}`)
      .then((response)=> setProject(response.data))
      .catch((err)=> console.log(err));
  }

  const handleApproveSubmission = async() =>{
    await axios.get(`http://localhost:6001/approve-submission/${params['id']}`)
      .then(()=> {
        fetchProject(params['id']);
        alert("Submission approved!!");
      })
      .catch((err)=> console.log(err));
  }

  const handleRejectSubmission = async() =>{
    await axios.get(`http://localhost:6001/reject-submission/${params['id']}`)
      .then(()=> {
        fetchProject(params['id']);
        alert("Submission rejected!!");
      })
      .catch((err)=> console.log(err));
  }

  const handleMessageSend = async() =>{
    socket.emit("new-message", {
      projectId: params['id'],
      senderId: localStorage.getItem("userId"),
      message,
      time: new Date()
    });
    setMessage("");
    fetchChats();
  }

  const fetchChats = async() =>{
    await axios.get(`http://localhost:6001/fetch-chats/${params['id']}`)
      .then((response)=> setChats(response.data));
  }

  return (
    <>
    {project && (
      <div className="project-data-page">

        <div className="project-data-container">
          <div className="project-data">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="skills-box">
              <h5>Required skills</h5>
              <div className="required-skills">
                {project.skills.map((skill)=> (
                  <p key={skill}>{skill}</p>
                ))}
              </div>
            </div>
            <div className="budget-box">
              <h5>Budget</h5>
              <h6>₹ {project.budget}</h6>
            </div>
          </div>

          {project.freelancerId && (
            <div className="project-submissions-container">
              <h4>Submission</h4>
              <div className="project-submissions">
                {project.submission ? (
                  <div className="project-submission">
                    <div className="link-line">
                      <h5>Project Link: </h5>
                      <a href={project.projectLink} target='_blank' rel="noreferrer">{project.projectLink}</a>
                    </div>
                    <div className="link-line">
                      <h5>Manual Link: </h5>
                      <a href={project.manulaLink} target='_blank' rel="noreferrer">{project.manulaLink}</a>
                    </div>
                    <div className="desc-line">
                      <h5>Description</h5>
                      <p>{project.submissionDescription}</p>
                    </div>
                    {project.submissionAccepted ? (
                      <h5 className="status-approved">Project completed!!</h5>
                    ) : (
                      <div className="submission-btns">
                        <button className='btn-approve' onClick={handleApproveSubmission}>Approve</button>
                        <button className='btn-reject' onClick={handleRejectSubmission}>Reject</button>
                      </div>
                    )}
                  </div>
                ) : <p className="no-submissions">No submissions yet!</p>}
              </div>
            </div>
          )}
        </div>

        <div className="project-chat-container">
          <h4>Chat with the Freelancer</h4>
          <div className="chat-body">
            {project.freelancerId ? (
              <>
                <div className="chat-messages">
                  {chats && chats.messages.map((msg, idx)=>(
                    <div key={idx} className={msg.senderId === localStorage.getItem("userId") ? "my-message" : "received-message"}>
                      <div>
                        <p>{msg.text}</p>
                        <h6>{msg.time.slice(5,10)} - {msg.time.slice(11,19)}</h6>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input">
                  <input type="text" className='form-control' placeholder='Enter message...' value={message} onChange={(e)=> setMessage(e.target.value)} />
                  <button onClick={handleMessageSend}>Send</button>
                </div>
              </>
            ) : (
              <i className="chat-disabled">Chat will be enabled if the project is assigned!</i>
            )}
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ProjectWorking
