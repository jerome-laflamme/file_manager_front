/* eslint-disable react-hooks/rules-of-hooks */
import {  useEffect, useState } from "react";
import CardHeader from "../components/CardHeader";
import NewProject from "../components/NewProject";
import ManageSavedProjects from "../components/ManageSavedProjects";

import '../index.css'
 
export default function Window2() {
  const [savedProjects, setSavedProjects] = useState([]);

  // SETUP LOCAL STORAGE AND LOAD PROJECTS
  useEffect(() => {
    if (!localStorage.getItem('projects')) {
      localStorage.setItem('projects', JSON.stringify([]));
    } else {
      setSavedProjects(JSON.parse(localStorage.getItem('projects')));
    }
  }, []);



  return (
    <div className='wrapper'>
      <div className='card slim'>
        <CardHeader />
        <div className="slim-card-content">
          <NewProject savedProjects={savedProjects} setSavedProjects={setSavedProjects} /> 
          <ManageSavedProjects savedProjects={savedProjects} setSavedProjects={setSavedProjects} />
        </div>
        <p className="bottom-text">-Do not use illegal characters or symbols</p>
      </div>
    </div>
  );
}
