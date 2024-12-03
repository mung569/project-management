"use client";

import React, { useState } from "react";
import TaskModal from "../components/TaskModal";
import NavBar from "../components/NavBar";
import styles from "./ToDoPage.module.css";
import Calendar from "../calendar/page";
import { useRouter } from "next/navigation";

interface Task {
  text: string;
  dueDate: string;
  completed: boolean;
  time?: string;
  notes?: string;
}

const ToDoPage: React.FC = () => {
  const router = useRouter();

  const initialLists = {
    "To-do": [
      { text: "Submit draft", dueDate: "2024-12-2", completed: true },
      { text: "Write follow-up email", dueDate: "2024-12-2", completed: false },
    ],
    Important: [
      { text: "Prepare for meeting", dueDate: "2024-12-4", completed: false },
    ],
    Assignments: [
      { text: "Complete project report", dueDate: "2024-12-6", completed: false },
      { text: "Submit final assignment", dueDate: "2024-12-8", completed: false },
    ],
    Other: [{ text: "Plan weekend trip", dueDate: "2024-12-10", completed: false }],
  };

  const [lists, setLists] = useState<{ [key: string]: Task[] }>(initialLists);
  const [selectedList, setSelectedList] = useState<string>("To-do");
  const [tasks, setTasks] = useState<Task[]>(initialLists[selectedList]);
  const [isAddingList, setIsAddingList] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // State for editing

  const coreLists = ["To-do", "Important", "Assignments", "Other"];

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
      setNewListName("");
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

  // Handle opening the modal to add a new task
  const openModal = () => {
    setTaskToEdit(null); // Reset taskToEdit for new tasks
    setIsModalOpen(true);
  };

  // Handle opening the modal to edit a task
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task); // Set the task to edit
    setIsModalOpen(true);
  };

  // Handle saving a new or edited task from the modal
  const handleSaveTask = (
    text: string,
    dueDate: string,
    time: string,
    notes: string,
    image: string | null
  ) => {
    if (taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task === taskToEdit ? { ...task, text, dueDate, time, notes, image } : task
      );
      setTasks(updatedTasks);
      setLists({ ...lists, [selectedList]: updatedTasks });
    } else {
      const updatedTasks = [
        ...tasks,
        { text, dueDate, time, notes, image, completed: false },
      ];
      setTasks(updatedTasks);
      setLists({ ...lists, [selectedList]: updatedTasks });
    }
    setIsModalOpen(false);
  };
  

  // Handle deleting a specific task
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    setLists({ ...lists, [selectedList]: updatedTasks });
  };

  return (
    <div className={styles.pageContainer}>
      <NavBar /> {/* Navbar at the top */}
      <div className={styles.contentContainer}>
        {/* Sidebar with list options */}
        <div className={styles.sidebar}>
          <h2>
            Saturday, <span className={styles.date}>Feb 27</span>
          </h2>
          {Object.keys(lists).map((listName) => (
            <div
              key={listName}
              className={`${styles.navItem} ${
                selectedList === listName ? styles.activeNavItem : ""
              }`}
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
          <div
            className={styles.addList}
            onClick={() => setIsAddingList(true)}
          >
            + New list
          </div>
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
            <input
              type="text"
              placeholder="Add task..."
              readOnly
              onClick={openModal}
            />
            <button
              className={styles.detailsButton}
              onClick={openModal}
            >
              Add
            </button>
          </div>
          <ul className={styles.taskList}>
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`${styles.taskItem} ${
                  task.completed ? styles.completed : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                />
                <span onClick={() => handleEditTask(task)}>{task.text}</span> {/* Edit on click */}
                <span className={styles.dueDate}>{task.dueDate}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteTask(index)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.logoutButton}
            onClick={() => router.push("/login")}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={taskToEdit} // Pass taskToEdit for editing
        />
      )}
      <Calendar key={JSON.stringify(lists)} lists={lists} />
    </div>
  );
};

export default ToDoPage;