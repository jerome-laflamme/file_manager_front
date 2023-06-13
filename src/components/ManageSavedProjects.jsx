/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ManageSavedProjects({ savedProjects, setSavedProjects }) {
    //DUPLICATE PROJECT
    const duplicateProject = () => {
        const projectToDuplicate = savedProjects.find(({ id }) => id === Number(projectId));

        projectToDuplicate.id = savedProjects.length + 1; // Good enough for now
        projectToDuplicate.name = `${projectToDuplicate.name}_copy`;
        savedProjects.push(projectToDuplicate);
        setSavedProjects([...savedProjects]);
        localStorage.setItem('projects', JSON.stringify(savedProjects));
    }

    //DELETE PROJECT
    const deleteProject = () => {
        savedProjects.splice(savedProjects.findIndex(({ id }) => id === Number(projectId)), 1);
        setSavedProjects([...savedProjects]);
    }


    //LOAD PROJECT
    const [projectId, setProjectId] = useState(0);
    const getProjectId = () => {
        return (e) => setProjectId(e.target.value);
    }

    const navigate = useNavigate();
    const loadProject = () => {
        const projectName = savedProjects.find(({ id }) => id === Number(projectId)).name;
        navigate(`/${projectName}`);
    }

    const cancel = () => {
        navigate('/');
    }
    return (
        <div className="load-project-section">
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
            <button onClick={cancel} className="cancel-btn">Cancel</button>
        </div>
    )
}