/* eslint-disable react-hooks/rules-of-hooks */
import {  useEffect, useState } from "react";
import CardHeader from "../components/CardHeader";
import NewProject from "../components/NewProject";
import ManageSavedProjects from "../components/ManageSavedProjects";
import axios from 'axios';

import '../index.css'
 
export default function Window2() {
  const [savedProjects, setSavedProjects] = useState([]);

  // SETUP LOCAL STORAGE AND LOAD PROJECTS
  // useEffect(() => {
  //   if (localStorage.getItem('projects') === null) {
  //     localStorage.setItem('projects', JSON.stringify(data));
  //     setSavedProjects(data);
  //   } else {
  //     setSavedProjects(JSON.parse(localStorage.getItem('projects')));
  //   }
  // }, []);

  // LOAD PROJECTS FROM BACK END WITH AXIOS
  useEffect(() => {
    axios.get('http://localhost:3000/projects')
      .then(res => {
        setSavedProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // console.log(savedProjects);



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
