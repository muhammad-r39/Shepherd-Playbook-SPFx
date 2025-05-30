document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".calendar-events-container");
  const listContainer = document.querySelector(".events-holiday-list ul");
  const siteUrl = window.siteUrl;
  const listTitle = "ShepherdCalendar";

  let currentDate = new Date();

  function getLabelClass(category) {
    const map = {
      Holiday: "label-dark",
      Meeting: "label-green",
      Birthday: "label-lime",
      Default: "label-dark", // fallback
    };

    return map[category] || map.Default;
  }

  function formatLocalDate(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async function fetchEvents() {
    const endpoint = `${siteUrl}/_api/web/lists/getbytitle('${listTitle}')/items?$select=Title,EventDate,EndDate,Category`;

    try {
      const res = await fetch(endpoint, {
        headers: { Accept: "application/json;odata=verbose" },
        credentials: "include",
      });

      const json = await res.json();
      return json.d.results;
    } catch (err) {
      console.error("Failed to fetch events:", err);
      return [];
    }
  }

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function renderEventList(events) {
    const year = currentDate.getFullYear();
    const filtered = events
      .filter((e) => {
        const eventYear = new Date(e.EventDate).getFullYear();
        return eventYear === year;
      })
      .sort((a, b) => new Date(a.EventDate) - new Date(b.EventDate)); // Sort by date

    const html = filtered
      .map((e) => {
        const startDate = new Date(e.EventDate);
        const endDate = new Date(e.EndDate);
        const title = e.Title || "Untitled";
        const day = `${startDate.getDate()}`.padStart(2, "0");
        const month = startDate
          .toLocaleString("default", { month: "short" })
          .toUpperCase();
        const year = startDate.getFullYear();

        const category = e.Category || "Default";
        const labelClass = getLabelClass(category);

        // Helper to check if event is all day
        const isMidnightUTC = (date) =>
          date.getUTCHours() === 0 && date.getUTCMinutes() === 0;

        let durationLabel = "";
        if (category === "Holiday") {
          const showTime = !isMidnightUTC(startDate);
          durationLabel = `Closed${
            showTime
              ? ` @ ${startDate
                  .toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                  .toLowerCase()}`
              : ""
          }`;
        } else {
          const showStart = !isMidnightUTC(startDate);
          const showEnd = !isMidnightUTC(endDate);
          if (showStart && showEnd) {
            const startTime = startDate
              .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
              .toLowerCase();
            const endTime = endDate
              .toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
              .toLowerCase();
            durationLabel = `${startTime} - ${endTime}`;
          }
        }

        return `
      <li class="event ${labelClass}" data-date="${formatLocalDate(startDate)}">
        <div class="event-date">
          <span class="year">${year}</span>
          <span class="date">${day}</span>
          <span class="month">${month}</span>
        </div>
        <div class="event-details">
          <div class="event-time">
            <h4 class="event-title">${title}</h4>
            <span class="event-duration">${durationLabel}</span>
          </div>
        </div>
      </li>
    `;
      })
      .join("");

    listContainer.innerHTML = html;

    // Scroll/focus to calendar cell on click
    document.querySelectorAll(".events-holiday-list li").forEach((item) => {
      item.addEventListener("click", () => {
        const date = item.dataset.date;
        const cell = document.querySelector(
          `.calendar-day[data-date="${date}"]`
        );
        if (cell) {
          cell.scrollIntoView({ behavior: "smooth", block: "center" });
          cell.classList.add("highlighted");
          setTimeout(() => cell.classList.remove("highlighted"), 1500);
        }
      });
    });
  }

  function renderCalendar(events) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0

    const monthName = currentDate.toLocaleString("default", { month: "long" });

    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

    let html = `
      <div class="calendar">
        <div class="calendar-header">
          <button class="prev-month">⯇</button>
          <span>${monthName} ${year}</span>
          <button class="next-month">⯈</button>
        </div>
        <div class="calendar-grid">
          ${dayNames
            .map((day) => `<div class="day-name">${day}</div>`)
            .join("")}
    `;

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatLocalDate(date);

      const eventMatch = events.find((e) => {
        const eventDate = formatLocalDate(new Date(e.EventDate));
        return eventDate === dateStr;
      });

      html += `
        <div class="calendar-day ${eventMatch ? "has-event" : ""}" 
             data-date="${dateStr}" 
             title="${eventMatch ? eventMatch.Title : ""}">
          <span class="day-number">${day}</span>
        </div>
      `;
    }

    html += `</div></div>`;
    container.innerHTML = html;

    // Event listeners
    document.querySelector(".prev-month").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      fetchEvents().then(renderCalendar);
    });

    document.querySelector(".next-month").addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      fetchEvents().then(renderCalendar);
    });

    document.querySelectorAll(".calendar-day.has-event").forEach((dayEl) => {
      dayEl.addEventListener("click", () => {
        const date = dayEl.dataset.date;
        console.log("Clicked date with event:", date);

        const listItem = document.querySelector(
          `.events-holiday-list li[data-date="${date}"]`
        );
        if (listItem) {
          listItem.scrollIntoView({ behavior: "smooth", block: "center" });
          listItem.classList.add("highlighted");
          setTimeout(() => listItem.classList.remove("highlighted"), 3000);
        }
      });
    });

    document.querySelectorAll(".calendar-day").forEach((dayEl) => {
      dayEl.addEventListener("click", () => {
        const date = dayEl.dataset.date;
        if (date) console.log("Clicked any day:", date);
      });
    });

    document.querySelectorAll(".event-dot").forEach((dot) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent day click
        const title = dot.dataset.title;
        console.log("Clicked event:", title);
      });
    });
  }

  fetchEvents().then((events) => {
    renderCalendar(events);
    renderEventList(events);
  });
});
