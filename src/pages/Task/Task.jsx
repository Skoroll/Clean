import React, {useEffect} from 'react';
import { useContext } from 'react';
import TaskBar from '../../components/TaskBar/TaskBar';
import TaskTheme from '../../components/TaskTheme/TaskTheme';
import Modal from '../../components/Modal/Modal';
import { useLocation } from "react-router-dom";
import GoBack from '../../components/GoBack/GoBack';
import { UserContext } from '../../UserContext';
import "./Task.scss";

function Task() {
  const { pathname } = useLocation();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    document.title = 'ChoreHelper - Votre ménage';
  }, []);

  useEffect(() => {
    // Récupérer les données utilisateur depuis localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='task'>
      <GoBack target="/"/>
      <p className='task--title'>Bonjour {user.name} </p>
      <p className="task--subtitle">De quoi on s'occupe aujourd'hui ?</p>
      <TaskBar />
      <Modal />
      <TaskTheme />
    </div>

  );
}

export default Task;
