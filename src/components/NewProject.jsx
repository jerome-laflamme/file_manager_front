/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function NewProject({ savedProjects, setSavedProjects }) {
    //Set name
    const [projectName, setProjectName] = useState('');
    const projectNameHandler = () => {
        return (e) => setProjectName(e.target.value);
    }

    //Set date
    const [dateBool, setDateBool] = useState(false);
    const dateBoolHandler = () => {
        return () => setDateBool(!dateBool);
    }

    //Create project
    const createProject = () => {
        //Check if name has illegal characters
        if (/^[A-Za-z0-9_-~]+$/.test(projectName) === false || projectName === '') {
            alert('Project name cannot contain illegal characters');
            return;
        }
        const newProject = {
            author: 'pomerleau_tester', // Hardcoded for now
            name: projectName,
            date: dateBool ? new Date().toLocaleDateString() : 'Not defined',
            id: savedProjects.length + 1 //Good enough for now maybe change later
        }
        savedProjects.push(newProject);
        setSavedProjects([...savedProjects]);
        localStorage.setItem('projects', JSON.stringify(savedProjects));
        setProjectName('');
    }

    return (
        <>
            <h3>Create a new Project</h3>
            <div className='new-project-section'>
                <h3>Project name</h3>
                <input type='text' onChange={projectNameHandler()} className='project-name-input' />
                <div className="flex-end">
                    <button onClick={createProject} className="btn">Create</button>
                </div>
                <div className="inline">
                    <input type="checkbox" id="todayDate" onChange={dateBoolHandler()} />
                    <label htmlFor="todayDate">Select today as start date</label>
                </div>
            </div>
        </>
    )
}