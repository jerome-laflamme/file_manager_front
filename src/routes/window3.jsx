import { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from '../components/Dropzone';
import '../index.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Window3() {
  const [project, setProject] = useState({});
  const [projects, setProjects] = useState([]);
  
  // Get project on server side with axios
  useEffect(() => {
    const projectName = window.location.pathname.split('/')[1];
    axios.get(`http://localhost:3000/projects/${projectName}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(err => console.log(err));

      axios.get('http://localhost:3000/projects')
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
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
    axios.put(`http://localhost:3000/projects/${project.name}`, project, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        console.log(res.data);
      }
      )
      .catch(err => console.log(err));
  }

  const cancelEdit = () => {
    setIsEditing(false);
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