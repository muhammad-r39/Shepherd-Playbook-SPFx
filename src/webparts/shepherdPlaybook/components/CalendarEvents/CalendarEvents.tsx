import React, { useEffect, useState } from "react";
import styles from "./CalendarEvents.module.scss";
import { SPHttpClient } from "@microsoft/sp-http";
import { config } from "../../config";

interface CalendarProps {
  spHttpClient: SPHttpClient;
}

interface CalendarEvent {
  ID: number;
  Title: string;
  EventDate: string;
  Category: string;
}

const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

const formatDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

const CalendarEvents: React.FC<CalendarProps> = ({ spHttpClient }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const calendarYear = currentDate.getFullYear();
  const calendarMonth = currentDate.getMonth();

  useEffect(() => {
    const fetchYearlyEvents = async () => {
      const start = new Date(calendarYear, 0, 1);
      const end = new Date(calendarYear, 11, 31);

      const startStr = start.toISOString();
      const endStr = end.toISOString();
      const siteUrl = config.siteUrl;
      const calendarName = config.calendarName;

      const url = `${siteUrl}/_api/web/lists/getbytitle('${calendarName}')/items?$select=ID,Title,EventDate,Category&$filter=EventDate ge datetime'${startStr}' and EventDate le datetime'${endStr}'&$orderby=EventDate asc`;

      try {
        const response = await spHttpClient.get(
          url,
          SPHttpClient.configurations.v1
        );
        const data = await response.json();
        const mapped = data.value.map((item: any) => ({
          ID: item.ID,
          Title: item.Title,
          EventDate: item.EventDate,
          Category: item.Category,
        }));

        setEvents(mapped);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      }
    };

    fetchYearlyEvents();
  }, [spHttpClient, calendarYear]);

  const handleDateClick = (day: number) => {
    const scrollDate = new Date(calendarYear, calendarMonth, day);
    const scrollId = `event-${scrollDate.getFullYear()}-${String(
      scrollDate.getMonth() + 1
    ).padStart(2, "0")}-${String(scrollDate.getDate()).padStart(2, "0")}`;

    const el = document.getElementById(scrollId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("highlighted");

      setTimeout(() => {
        el.classList.remove("highlighted");
      }, 2000);
    }
  };

  const goToPrevMonth = () => {
    const newDate = new Date(calendarYear, calendarMonth - 1, 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(calendarYear, calendarMonth + 1, 1);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div
          key={`empty-${i}`}
          className={"calendar-day" + " empty " + styles.empty}
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(new Date(calendarYear, calendarMonth, day));
      const hasEvent = events.some((event) => {
        const eventDate = new Date(event.EventDate);
        return (
          eventDate.getFullYear() === calendarYear &&
          eventDate.getMonth() === calendarMonth &&
          eventDate.getDate() === day
        );
      });

      cells.push(
        <div
          key={dateStr}
          className={`calendar-day ${hasEvent ? "has-event" : ""}`}
          onClick={() => hasEvent && handleDateClick(day)}
          title={hasEvent ? "Click to view event" : ""}
        >
          <span>{day}</span>
        </div>
      );
    }

    return cells;
  };

  return (
    <>
      <div className="calendar-events-container">
        <div className="calendar">
          <div className="calendar-header">
            <button className="prev-month" onClick={goToPrevMonth}>
              ⯇
            </button>
            <span>
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {calendarYear}
            </span>
            <button className="next-month" onClick={goToNextMonth}>
              ⯈
            </button>
          </div>

          <div className="calendar-grid">
            {dayNames.map((d, i) => (
              <div key={i} className="day-name">
                {d}
              </div>
            ))}
            {renderCalendarDays()}
          </div>
        </div>

        <div className="events-holiday-list">
          <ul className="event-lists">
            {events.map((event) => {
              const date = new Date(event.EventDate);
              const dateStr = formatDate(date);

              const year = date.getFullYear();
              const day = date.getDate();
              const month = date.toLocaleString("default", { month: "short" });

              // Optional: You can customize this based on event.Category or other logic
              const labelClass = event.Category
                ? event.Category.toLowerCase()
                : "default";

              return (
                <li
                  key={event.ID}
                  id={`event-${dateStr}`}
                  className={`event ${labelClass}`}
                  data-date={dateStr}
                >
                  <div className="event-date">
                    <span className="year">{year}</span>
                    <span className="date">{day}</span>
                    <span className="month">{month}</span>
                  </div>
                  <div className="event-details">
                    <div className="event-time">
                      <h4 className="event-title">{event.Title}</h4>
                      <span className="event-duration">{event.Category}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CalendarEvents;
