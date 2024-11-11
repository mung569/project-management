// ToDoPage.tsx
"use client";

import React, { useState } from 'react';
import TaskModal from '../components/TaskModal';
import NavBar from '../components/NavBar';
import styles from './ToDoPage.module.css';
import { useRouter } from 'next/navigation';

interface Task {
  text: string;
  dueDate: string;
  completed: boolean;
}

const ToDoPage: React.FC = () => {
  const initialLists = {
    "To-do": [
      { text: 'Submit draft', dueDate: 'Today', completed: true },
      { text: 'Write follow-up email', dueDate: 'Tomorrow', completed: false },
    ],
    Important: [
      { text: 'Prepare for meeting', dueDate: 'Monday', completed: false },
    ],
    Assignments: [
      { text: 'Complete project report', dueDate: 'Wednesday', completed: false },
      { text: 'Submit final assignment', dueDate: 'Friday', completed: false },
    ],
    Other: [
      { text: 'Plan weekend trip', dueDate: 'Saturday', completed: false },
    ],
  };

  const [lists, setLists] = useState<{ [key: string]: Task[] }>(initialLists);
  const [selectedList, setSelectedList] = useState<string>('To-do');
  const [tasks, setTasks] = useState<Task[]>(initialLists[selectedList]);
  const [isAddingList, setIsAddingList] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const coreLists = ['To-do', 'Important', 'Assignments', 'Other'];

  // Handle switching lists
  const handleListChange = (listName: string) => {
    setSelectedList(listName);
    setTasks(lists[listName] || []);
  };

  // Toggle completion status of a task
  const toggleComplete = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setLists({ ...lists, [selectedList]: updatedTasks });
  };

  // Handle adding a new list
  const handleAddList = () => {
    if (newListName.trim() && !lists[newListName]) {
      setLists({ ...lists, [newListName]: [] });
      setSelectedList(newListName);
      setTasks([]);
      setNewListName('');
      setIsAddingList(false);
    }
  };

  // Handle deleting a list
  const handleDeleteList = (listName: string) => {
    if (coreLists.includes(listName)) {
      alert("This is a core list and cannot be deleted.");
      return;
    }

    const updatedLists = { ...lists };
    delete updatedLists[listName];
    setLists(updatedLists);

    // Reset to "To-do" or an available list after deletion
    const defaultList = "To-do";
    setSelectedList(defaultList);
    setTasks(updatedLists[defaultList] || []);
  };

  // Handle opening the modal to add a task
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle saving a new task from the modal
  const handleSaveTask = (text: string, dueDate: string) => {
    const updatedTasks = [...tasks, { text, dueDate, completed: false }];
    setTasks(updatedTasks);
    setLists({ ...lists, [selectedList]: updatedTasks });
  };

  const router = useRouter();

  return (
    <div className={styles.pageContainer}>
      <NavBar /> {/* Navbar at the top */}
      <div className={styles.contentContainer}>
        {/* Sidebar with list options */}
        <div className={styles.sidebar}>
          <h2>Saturday, <span className={styles.date}>Feb 27</span></h2>
          {Object.keys(lists).map((listName) => (
            <div
              key={listName}
              className={`${styles.navItem} ${selectedList === listName ? styles.activeNavItem : ''}`}
            >
              <span onClick={() => handleListChange(listName)}>{listName}</span>
              {!coreLists.includes(listName) && (
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteList(listName)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
<<<<<<< HEAD
          <div className={styles.addList} onClick={() => setIsAddingList(true)}>+ New list</div>
          {isAddingList && (
            <div className={styles.newListInput}>
              <input
                type="text"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="List name"
              />
              <button onClick={handleAddList}>Add</button>
            </div>
          )}
        </div>

        {/* Main content with tasks for selected list */}
        <div className={styles.mainContent}>
          <header className={styles.header}>
            <h1>{selectedList}</h1>
          </header>
          <div className={styles.taskInput}>
            <input type="text" placeholder="Add task..." readOnly onClick={openModal} />
            <button className={styles.detailsButton} onClick={openModal}>Add</button>
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
=======
        </ul>
        <button type='button'
          className={styles.logoutButton}
          onClick={() => router.push('/login')}>
          Log Out
        </button>
>>>>>>> 10f13ee77debacece78a3b5dfa4b83f1b0e899f6
      </div>

      {/* Task Modal */}
      {isModalOpen && <TaskModal onClose={closeModal} onSave={handleSaveTask} />}
    </div>
  );
};

export default ToDoPage;
