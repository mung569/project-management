"use client";

import React, { useState } from 'react';
import styles from './CalendarPage.module.css'
import NavBar from '../components/NavBar';
import { useRouter } from 'next/navigation';
import MiniCalendar from '../components/MiniCalendar'
import { useTaskContext } from '../TaskContext';

interface Task {
  text: string;
  dueDate: string; 
  completed: boolean;
}


// Helper function to generate the days of the month
const generateCalendar = (year, month) => {
  const date = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = date.getDay(); // The day of the week the month starts on
  const weeks = [];

  let days = [];
  for (let i = 1; i <= firstDay; i++) {
    days.push(null); // Empty spaces for days before the 1st of the month
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }
  }

  if (days.length > 0) {
    weeks.push(days); // Add remaining days in the last week
  }

  return weeks;
};

const Calendar: React.FC<{ lists: { [key: string]: Task[] } }> = ({ lists }) => {
  // Flatten tasks from all lists
  const tasks = Object.values(lists).flat();

  // Group tasks by their due dates
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.dueDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as { [key: string]: Task[] });

    // Set the initial state for the year and month
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed (0 = January, 11 = December)
    const weeks = generateCalendar(year, month);

    const currentDay = new Date().getDate(); // Get today's date

    // Handlers
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
        
    };

    //for testing
    React.useEffect(() => {
      console.log('Updated lists in Calendar:', lists);
    }, [lists]);
    
    

    return (
        <div className={styles.pageContainer}>
          <nav className={styles.nav}> </nav>
      <div className={styles.contentContainer}>
        <div className={styles.sidebar}>
          <div className={styles.monthChangers}>
            <button onClick={handlePrevMonth}>{`<`}</button>
            <button onClick={handleNextMonth}>{`>`}</button>
          </div>
            <MiniCalendar date={currentDate}/>
            
{/*             <button type='button'
              className={styles.logoutButton}
              onClick={() => router.push('/login')}>
                Log Out
          </button> */}
        </div>

        {/* Main content */}
        <div className={styles.calendar}>
            <div className={styles.calendarNav}>
            </div>
            <div className={styles.calendarBody}>
                <div className={styles.weekdays}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className={styles.weekday}>
                            {day}
                        </div>
                    ))}
                </div>

                <div className={styles.days}>
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className={styles.week}>
                            {week.map((day, dayIndex) => {
                                const date = `${year}-${month + 1}-${day}`.padStart(2, '0');
                                const isToday = day === currentDay && month === new Date().getMonth() && year === new Date().getFullYear();
                                console.log(date)
                                const dayTasks = tasksByDate[date] || [];
                                console.log(dayTasks)
                                return (
                                  <div key={dayIndex} className={styles.dayContainer}>
                                    <button
                                        key={dayIndex}
                                        className={`${styles.day} ${day ? styles.active : ''} ${selectedDay === day ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                                        onClick={() => handleDayClick(day)}
                                        disabled={true}
                                    >
                                        {day || ''}
                                        {/* Render tasks below the date */}
                                    {dayTasks.map((task, taskIndex) => (
                                      <div key={taskIndex} className={styles.task}>
                                         <span key={taskIndex} className={styles.task}>
                                            {task.text}
                                          </span>
                                      </div>
                                    ))}
                                    </button>
                  
                                  </div>
                                );
                            })} 
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
