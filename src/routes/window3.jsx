import { useState, useEffect } from 'react';
import Dropzone from '../components/Dropzone';
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

  //CRUD PROJECT
  const [isEditing, setIsEditing] = useState(false);
  const editProject = () => {
    setIsEditing(true);
  }

  const saveProject = () => {
    setIsEditing(false);
    const projects = JSON.parse(localStorage.getItem('projects'));
    const projectIndex = projects.findIndex(({ name }) => name === project.name);
    projects[projectIndex] = project;
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  const cancelEdit = () => {
    setIsEditing(false);
    const projectName = window.location.pathname.split('/')[1];
    const projects = JSON.parse(localStorage.getItem('projects'));
    const project = projects.find(({ name }) => name === projectName);
    setProject(project);
  }


  //DROPZONE PROPS
  const dropzoneList = [
    {
      title: 'PDF',
      acceptedObject: {
        'application/pdf' : ['.pdf'],
      },
      id: 1,
    },
    {
      title: 'PIC',
      acceptedObject: {
        'image/png' : ['.png'],
        'image/jpeg' : ['.jpg', '.jpeg'],
        'image/gif' : ['.gif'],
      },
      id: 2,
    },
    {
      title: 'Excel',
      acceptedObject: {
        'application/vnd.ms-excel' : ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ['.xlsx'],
      },
      id: 3,
    },
    {
      title: 'Word',
      acceptedObject: {
        'application/msword' : ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : ['.docx'],
      },
      id: 4,
    },
    {
      title: 'Source Code',
      acceptedObject: {
        'text/plain' : ['.txt'],
        'text/html' : ['.html'],
        'text/css' : ['.css'],
        'text/javascript' : ['.js'],
        'application/json' : ['.json'],
        'application/xml' : ['.xml'],
      },
      id: 5,
    },
    {
      title: 'URL link',
      acceptedObject: {
        'text/uri-list' : ['.url'],
      },
      id: 6,
    },
  ]

  return (
    <>
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
                    defaultValue={project.name}
                    className='project-bold-font'
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, name: event.target.value })}
                  />
                </div>
                <div className="inline">
                  <h5>Start date :</h5>
                  <input
                    defaultValue={project.startDate === "" ? "Not defined" : project.startDate}
                    className="information-input"
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, startDate: event.target.value })}
                  />
                </div>
                <div className="inline">
                  <h5>Expected finish date : </h5>
                  <input
                    defaultValue={project.finishDate === "" ? "Not defined" : project.finishDate}
                    className="information-input"
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, finishDate: event.target.value })}
                  />
                </div>
                <div className="inline">
                  <h5>Real finish date : </h5>
                  <input
                    defaultValue={project.realFinishDate === "" ? "Not defined" : project.realFinishDate}
                    className="information-input"
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, realFinishDate: event.target.value })}
                  />
                </div>
                <div className="order">
                  <h3>Order/Owner :</h3>
                  <input
                    defaultValue={project.author === "" ? "Not defined" : project.author}
                    className="project-bold-font smaller-font"
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, author: event.target.value })}
                  />
                </div>
                <div className="inline">
                  <h3>Revision : <span>V</span></h3>
                  <input
                    defaultValue={project.revision === "" ? "Not defined" : project.revision}
                    className='project-bold-font'
                    disabled={!isEditing}
                    onChange={(event) => setProject({ ...project, revision: event.target.value })}
                  />
                </div>
              </div>
              {/* unclear if this is needed for the purpose of this demo */}
              {/* <div className="drag-drop-inline">
                <div className="drag-drop-box">
                  <h1>Order doc.</h1>
                  <p>Drag/Drop</p>
                </div>
                <div className="drag-drop-box">
                  <h1>Delivered</h1>
                  <p>Drag/Drop</p>
                </div>
              </div> */}
              {isEditing ? (
                <div className="edit-buttons">
                  <button className='simple-btn edit-btn' onClick={saveProject}>Save</button>
                  <button className='simple-btn' onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <button className='simple-btn edit-btn' onClick={editProject}>Edit project information</button>
              )}
            </div>
            <div className="right">
              {dropzoneList.map(({id, title, acceptedObject }) => {
                return (
                 <Dropzone key={id} title={title} acceptedObject={acceptedObject} project={project}/>
                )
              })}
            </div>
          </div>
          <p className="bottom-text">-Drag and drop into the boxes</p>
        </div>

      </div>
    </>
  );
}