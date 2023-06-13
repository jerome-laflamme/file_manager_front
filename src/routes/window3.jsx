import { useState, useEffect } from 'react';
import '../index.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Window3() {
  //Get project in local storage
  const [project, setProject] = useState({});
  useEffect(() => {
    const projectName = window.location.pathname.split('/')[1];
    const projects = JSON.parse(localStorage.getItem('projects'));
    const project = projects.find(({ name }) => name === projectName);
    setProject(project);
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate('/window2');
  }

  const [isEditing, setIsEditing] = useState(false);
  const editProject = () => {
    setIsEditing(true);
  }

  const updateProject = () => {
    setIsEditing(false);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = projects.findIndex(({ name }) => name === project.name);
    projects[projectIndex] = project;
    localStorage.setItem('projects', JSON.stringify(projects));
  }


  const dragDropBoxes = [
    {
      'type': 'PDF',
      'id': 1,
    },
    {
      'type': 'PIC',
      'id': 2,
    },
    {
      'type': 'Excel',
      'id': 3,
    },
    {
      'type': 'Word',
      'id': 4,
    },
    {
      'type': 'Source Code',
      'id': 5,
    },
    {
      'type': 'URL link',
      'id': 6,
    },
  ]
  
  return (
    <div className='wrapper'>
      <div className='card'>
        <div className="window-3">
          <div className="left">
            <div className="back-section" onClick={goBack}>
              <AiOutlineArrowLeft className="arrow" /> Back
            </div>
            <div className="project-information">
              <div className="inline">
                <h3>Project: </h3>
                <input
                  value={project.name}
                  className='project-bold-font'
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, name: event.target.value })}
                />
              </div>
              <div className="inline">
                <h5>Start date :</h5>
                <input
                  value={project.startDate}
                  className="information-input"
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, startDate: event.target.value })}
                />
              </div>
              <div className="inline">
                <h5>Expected finish date : </h5>
                <input
                  value={project.finishDate}
                  className="information-input"
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, finishDate: event.target.value })}
                />
              </div>
              <div className="inline">
                <h5>Real finish date : </h5>
                <input
                  value={project.realFinishDate}
                  className="information-input"
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, realFinishDate: event.target.value })}
                />
              </div>
              <div className="order">
                <h3>Order/Owner :</h3>
                <input
                  value={project.author}
                  className="project-bold-font smaller-font"
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, author: event.target.value })}
                />
              </div>
              <div className="inline">
                <h3>Revision : <span>V</span></h3>
                <input
                  value={project.revision}
                  className='project-bold-font'
                  disabled={!isEditing}
                  onChange={(event) => setProject({ ...project, revision: event.target.value })}
                />
              </div>
            </div>
            <div className="drag-drop-inline">
              <div className="drag-drop-box">
                <h1>Order doc.</h1>
                <p>Drag/Drop</p>
              </div>
              <div className="drag-drop-box">
                <h1>Delivered</h1>
                <p>Drag/Drop</p>
              </div>
            </div>
            <button onClick={editProject} className='simple-btn edit-btn' >Edit project setting</button>
            {isEditing && <button onClick={updateProject} className='simple-btn edit-btn' >Save</button>}
          </div>
          <div className="right">
            {dragDropBoxes.map(({ type, id }) => {
              return (
                <div key={id} className="drag-drop-inline">
                  <div className="drag-drop-box">
                    <h1>{type}</h1>
                    <p>Drag/Drop</p>
                  </div>
                  <div className="empty-box">
                    <h1>NOT SET</h1>
                    <p>Drag/Drop</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <p className="bottom-text">-Drag and drop into the boxes</p>
      </div>

    </div>
  );
}