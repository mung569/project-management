// TaskModal.tsx
"use client";

import React, { useState } from 'react';
import { FiEdit, FiImage } from 'react-icons/fi';
import styles from './TaskModal.module.css';

interface TaskModalProps {
  onClose: () => void;
  onSave: (text: string, dueDate: string, time: string, notes: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave }) => {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (taskText.trim()) {
      onSave(taskText, dueDate || 'No date', time, notes);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Task Details <FiEdit /></h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>
        <input
          type="text"
          placeholder="Enter task..."
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className={styles.inputField}
        />
        <div className={styles.dateTimeRow}>
          <input
            type="date"
            placeholder="Due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="time"
            placeholder="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <textarea
          placeholder="Note/description..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={styles.textArea}
        />
        <button className={styles.addImageButton}>
          <FiImage /> Add image
        </button>
        <div className={styles.modalButtons}>
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
