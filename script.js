const apiUrl = 'http://localhost:5000';

async function addTask() {
  const name = document.getElementById("task-name").value;
  const dueDate = document.getElementById("task-due-date").value;
  const duration = document.getElementById("task-duration").value;
  const type = document.getElementById("task-type").value;

  const res = await fetch(`${apiUrl}/add-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      due_date: dueDate,
      duration: duration,
      type: type
    })
  });

  const data = await res.json();
  alert(data.message || "Task added");
}

async function startBreak() {
  const duration = document.getElementById("break-duration").value;

  const res = await fetch(`${apiUrl}/start-break`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ duration: duration })
  });

  const data = await res.json();
  alert(`Break started. Ends at: ${new Date(data.end_time).toLocaleTimeString()}`);
}

async function fetchSchedule() {
  const res = await fetch(`${apiUrl}/schedule`);
  const data = await res.json();
  const list = document.getElementById("schedule-list");
  list.innerHTML = "";

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.task} → ${item.start} to ${item.end}`;
    list.appendChild(li);
  });
}

async function fetchBreaks() {
  const res = await fetch(`${apiUrl}/breaks`);
  const data = await res.json();
  const list = document.getElementById("breaks-list");
  list.innerHTML = "";

  data.breaks.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `Break: ${b.start_time} for ${b.duration} mins (End: ${b.end_time})`;
    list.appendChild(li);
  });
}
