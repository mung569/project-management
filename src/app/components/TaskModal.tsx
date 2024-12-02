"use client";

import React, { useState } from "react";
import { FiEdit, FiImage } from "react-icons/fi";
import styles from "./TaskModal.module.css";

interface TaskModalProps {
  onClose: () => void;
  onSave: (text: string, dueDate: string, time: string, notes: string, image: string | null) => void;
  task?: {
    text: string;
    dueDate: string;
    completed: boolean;
    time?: string;
    notes?: string;
    image?: string | null;
  } | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ onClose, onSave, task }) => {
  const [taskText, setTaskText] = useState(task?.text || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [time, setTime] = useState(task?.time || "");
  const [notes, setNotes] = useState(task?.notes || "");
  const [image, setImage] = useState<string | null>(task?.image || null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Convert file to base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (taskText.trim()) {
      onSave(taskText, dueDate || "No date", time, notes, image);
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>
            Task Details <FiEdit />
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
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
        <div className={styles.imageUploadSection}>
          <label htmlFor="imageUpload" className={styles.addImageButton}>
            <FiImage /> Add image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          {image && (
            <div className={styles.imagePreview}>
              <img src={image} alt="Task Attachment" className={styles.previewImage} />
              <button
                className={styles.removeImageButton}
                onClick={() => setImage(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>
        <div className={styles.modalButtons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
