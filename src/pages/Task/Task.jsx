import React from 'react';
import TaskBar from '../../components/TaskBar/TaskBar';
import TaskTheme from '../../components/TaskTheme/TaskTheme';
import Modal from '../../components/Modal/Modal';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Task.scss";

function Task() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <div className='task'>
      <TaskBar />
      <Modal />
      <TaskTheme />
    </div>

  );
}

export default Task;
