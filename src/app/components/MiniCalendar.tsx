"use client";

import React, { useState, useEffect } from 'react';
import styles from './MiniCalendar.module.css';

type MiniCalendarProps = {
    date: Date
}

// Helper function to generate the days of the month
const generateCalendar = (year: number, month: number) => {
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

  if (days.length > 0 && days.length < 7) {
    while (days.length < 7) {
      days.push(null); // Fill the remaining days with null
    }
    weeks.push(days);
  }

  return weeks;
};

const MiniCalendar: React.FC<MiniCalendarProps> = ({ date }) => {

    // Set the initial state for the year and month
    const [currentDate, setCurrentDate] = useState(date);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed (0 = January, 11 = December)
    const weeks = generateCalendar(year, month);

    const currentDay = new Date().getDate(); // Get today's date

    // Handlers
    const handleDayClick = (day: number) => {
        setSelectedDay(day);
    };

    useEffect(() => {
        // Sync mini calendar when `date` prop changes
        setCurrentDate(date);
    }, [date]);

    return (
        <div className={styles.calendar}>
            <div className={styles.calendarHeader}>
                <h2>
                    {`${currentDate.toLocaleString('default', { month: 'long' })}`}&nbsp;
                    <div className={styles.year}>{year}</div>
                </h2>
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
    );
};

export default MiniCalendar;
