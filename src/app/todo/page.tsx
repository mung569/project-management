"use client";

import React, { useState } from 'react';
import styles from './ToDoPage.module.css';

const ToDoPage: React.FC = () => {
  const [tasks, setTasks] = useState([
    { text: 'Submit draft', dueDate: 'Today', completed: true },
    { text: 'Write follow-up email', dueDate: 'Tomorrow', completed: false },
    { text: 'Create presentation', dueDate: 'Tomorrow', completed: false },
    { text: 'Compile documents', dueDate: 'Feb 29', completed: false },
  ]);

  const toggleComplete = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Saturday, <span className={styles.date}>Feb 27</span></h2>
        <div className={styles.navItem}>To-do</div>
        <div className={styles.navItem}>Important</div>
        <div className={styles.navItem}>Assignments</div>
        <div className={styles.navItem}>Other</div>
        <div className={styles.addList}>+ New list</div>
      </div>
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>To-do</h1>
        </header>
        <div className={styles.taskInput}>
          <input type="text" placeholder="Add task..." />
          <button className={styles.detailsButton}>Details</button>
        </div>
        <ul className={styles.taskList}>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(index)}
              />
              <span>{task.text}</span>
              <span className={styles.dueDate}>{task.dueDate}</span>
            </li>
          ))}
        </ul>
        <button className={styles.logoutButton}>Log Out</button>
      </div>
    </div>
  );
};

export default ToDoPage;
