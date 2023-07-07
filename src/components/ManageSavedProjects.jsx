/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function ManageSavedProjects({ savedProjects, setSavedProjects }) {
    const [projectId, setProjectId] = useState(1);
    //LOAD PROJECT
    const getProjectId = () => {
        return (e) => setProjectId(e.target.value);
    }

    const navigate = useNavigate();
    const loadProject = () => {
        const projectName = savedProjects.find(({ id }) => id === Number(projectId)).name;
        navigate(`/${projectName}`);
    }

    //DUPLICATE PROJECT
    const duplicateProject = () => {
        const projectToDuplicate = savedProjects.find(({ id }) => id === Number(projectId));
        const duplicatedProject = { ...projectToDuplicate };
        duplicatedProject.name = `${projectToDuplicate.name}_copy`;
        duplicatedProject.id = savedProjects.length + 1;
        savedProjects.push(duplicatedProject);
        setSavedProjects([...savedProjects]);
        axios.post(`http://localhost:3000/projects/${projectToDuplicate.name}/duplicate`, duplicatedProject)
        .catch(err => console.log(err));
    }

    //DELETE PROJECT
    const deleteProject = () => {
        const name = savedProjects.find(({ id }) => id === Number(projectId)).name;
        savedProjects.splice(savedProjects.findIndex(({ id }) => id === Number(projectId)), 1);
        setSavedProjects([...savedProjects]);
        axios.delete(`http://localhost:3000/projects/${name}`)
    }

    const cancel = () => {
        navigate('/');
    }
    return (
        <div className="load-project-section">
            {/* {savedProjects.length === 0 && <p>No saved projects</p>} */}
            <h3>Manage my Projects</h3>
            <select name="Projects" size={savedProjects.length} id="savedProjects" onChange={getProjectId()}>
                {savedProjects.map(({ name, id }) => (
                    <option key={id} value={id}>{name}</option>
                ))}
            </select>
            <div className="inline">
                <button onClick={duplicateProject} className="btn">Duplicate</button>
                <button onClick={deleteProject} className="btn">Delete</button>
                <button onClick={loadProject} className="btn">Load</button>
            </div>
            <button onClick={cancel} className="simple-btn">Cancel</button>
        </div>
    )
}