"use client";

import React, { useState } from 'react';
import styles from './CalendarPage.module.css';
import NavBar from '../components/NavBar';
import { useRouter } from 'next/navigation';
import MiniCalendar from '../components/MiniCalendar'

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

const Calendar: React.FC = () => {
    const router = useRouter();

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

    return (
        <div className={styles.pageContainer}>
      <NavBar />
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
                <button>Day</button>
                <button>Week</button>
                <button className={styles.monthButton}>Month</button>
                <button>Year</button>
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
                                const isToday = day === currentDay && month === new Date().getMonth() && year === new Date().getFullYear();
                                return (
                                    <button
                                        key={dayIndex}
                                        className={`${styles.day} ${day ? styles.active : ''} ${selectedDay === day ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                                        onClick={() => handleDayClick(day)}
                                        disabled={true}
                                    >
                                        {day || ''}
                                    </button>
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
