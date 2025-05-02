document.addEventListener('DOMContentLoaded', function() {
    // Initialize Chart.js for earnings visualization
    const earningsCtx = document.getElementById('earningsChart').getContext('2d');
    
    const earningsChart = new Chart(earningsCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Monthly Earnings (₺)',
          data: [3200, 2900, 3500, 3800, 4000, 4250],
          backgroundColor: 'rgba(0, 204, 136, 0.1)',
          borderColor: '#00cc88',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  
    // Toggle mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
  
    // Notification dropdown
    const notification = document.querySelector('.notification');
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.innerHTML = `
      <div class="notification-header">
        <h4>Notifications</h4>
        <span class="mark-all-read">Mark all as read</span>
      </div>
      <div class="notification-list">
        <div class="notification-item unread">
          <div class="notification-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <div class="notification-content">
            <p>New job booked for tomorrow at 10:00 AM</p>
            <span class="notification-time">2 hours ago</span>
          </div>
        </div>
        <div class="notification-item unread">
          <div class="notification-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="notification-content">
            <p>You received a 5-star rating from Ahmet Yılmaz</p>
            <span class="notification-time">1 day ago</span>
          </div>
        </div>
        <div class="notification-item">
          <div class="notification-icon">
            <i class="fas fa-wallet"></i>
          </div>
          <div class="notification-content">
            <p>Payment of ₺450 has been processed</p>
            <span class="notification-time">3 days ago</span>
          </div>
        </div>
      </div>
      <div class="notification-footer">
        <a href="#">View all notifications</a>
      </div>
    `;
    
    if (notification) {
      notification.addEventListener('click', function(e) {
        e.stopPropagation();
        const existingDropdown = document.querySelector('.notification-dropdown');
        
        if (existingDropdown) {
          existingDropdown.remove();
        } else {
          notification.appendChild(notificationDropdown);
          
          // Mark as read when clicking on notifications
          const markAllRead = notificationDropdown.querySelector('.mark-all-read');
          const unreadItems = notificationDropdown.querySelectorAll('.unread');
          
          markAllRead.addEventListener('click', function() {
            unreadItems.forEach(item => {
              item.classList.remove('unread');
            });
            notification.querySelector('.badge').style.display = 'none';
          });
        }
      });
      
      // Close dropdown when clicking elsewhere
      document.addEventListener('click', function() {
        const existingDropdown = document.querySelector('.notification-dropdown');
        if (existingDropdown) {
          existingDropdown.remove();
        }
      });
    }
  
    // Profile dropdown
    const profile = document.querySelector('.profile');
    const profileDropdown = document.createElement('div');
    profileDropdown.className = 'profile-dropdown';
    profileDropdown.innerHTML = `
      <a href="#"><i class="fas fa-user"></i> Profile</a>
      <a href="#"><i class="fas fa-cog"></i> Settings</a>
      <a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
    `;
    
    if (profile) {
      profile.addEventListener('click', function(e) {
        e.stopPropagation();
        const existingDropdown = document.querySelector('.profile-dropdown');
        
        if (existingDropdown) {
          existingDropdown.remove();
        } else {
          profile.appendChild(profileDropdown);
        }
      });
      
      // Close dropdown when clicking elsewhere
      document.addEventListener('click', function() {
        const existingDropdown = document.querySelector('.profile-dropdown');
        if (existingDropdown) {
          existingDropdown.remove();
        }
      });
    }
  
    // Simulate loading data
    setTimeout(() => {
      // This would be replaced with actual API calls in a real application
      console.log('Dashboard data loaded');
    }, 1000);
  });   
  // Activate sidebar menu items on click
document.querySelectorAll('.sidebar-nav li').forEach(item => {
  item.addEventListener('click', function() {
    // Remove active class from all items
    document.querySelectorAll('.sidebar-nav li').forEach(i => {
      i.classList.remove('active');
    });
    // Add active class to clicked item
    this.classList.add('active');
  });
});
// SCHEDULE SECTION FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
  // Current date tracking
  let currentDate = new Date();
  let currentView = 'month'; // day/week/month
  
  // Sample jobs data
  const jobs = [
    { id: 1, title: "Plumbing Repair", client: "Ahmet Y.", date: new Date(2023, 5, 15, 10, 0), duration: 2, price: "₺350" },
    { id: 2, title: "Electrical Check", client: "Maria K.", date: new Date(2023, 5, 18, 14, 0), duration: 1, price: "₺250" }
  ];
  
  // Initialize calendar
  function initCalendar() {
    renderCalendar();
    renderWorkingHours();
    renderDaySelector();
    
    // View toggle
    document.querySelectorAll('.view-options .btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelector('.view-options .btn.active').classList.remove('active');
        this.classList.add('active');
        currentView = this.dataset.view;
        renderCalendar();
      });
    });
    
    // Navigation
    document.getElementById('prev-period').addEventListener('click', () => {
      if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() - 1);
      } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() - 7);
      } else {
        currentDate.setDate(currentDate.getDate() - 1);
      }
      renderCalendar();
    });
    
    document.getElementById('next-period').addEventListener('click', () => {
      if (currentView === 'month') {
        currentDate.setMonth(currentDate.getMonth() + 1);
      } else if (currentView === 'week') {
        currentDate.setDate(currentDate.getDate() + 7);
      } else {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      renderCalendar();
    });
    
    // Save availability
    document.getElementById('save-availability').addEventListener('click', saveAvailability);
  }
  
  // Render calendar based on current view
  function renderCalendar() {
    const calendarEl = document.getElementById('calendar');
    calendarEl.innerHTML = '';
    
    if (currentView === 'month') {
      renderMonthView();
    } else if (currentView === 'week') {
      renderWeekView();
    } else {
      renderDayView();
    }
  }
  
  function renderMonthView() {
    const calendarEl = document.getElementById('calendar');
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    document.getElementById('current-period').textContent = 
      `${new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    
    // Day headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      calendarEl.appendChild(dayHeader);
    });
    
    // Get first day of month and how many days to show from previous month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day empty';
      calendarEl.appendChild(dayEl);
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day';
      dayEl.textContent = i;
      
      const dayDate = new Date(year, month, i);
      if (dayDate.toDateString() === today.toDateString()) {
        dayEl.classList.add('today');
      }
      
      // Check for jobs on this day
      const dayJobs = jobs.filter(job => 
        job.date.getDate() === i && 
        job.date.getMonth() === month && 
        job.date.getFullYear() === year
      );
      
      if (dayJobs.length > 0) {
        dayEl.classList.add('has-jobs');
        dayEl.innerHTML = `${i}<div class="day-jobs">${dayJobs.length} job${dayJobs.length > 1 ? 's' : ''}</div>`;
      }
      
      dayEl.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
        dayEl.classList.add('selected');
        showDayJobs(dayDate);
      });
      
      calendarEl.appendChild(dayEl);
    }
  }
  
  function renderWeekView() {
    // Similar implementation for week view
    // Would show 7 days starting from current week
  }
  
  function renderDayView() {
    // Similar implementation for day view
    // Would show single day with time slots
  }
  
  function showDayJobs(date) {
    // Display jobs modal for selected day
    const dayJobs = jobs.filter(job => 
      job.date.getDate() === date.getDate() && 
      job.date.getMonth() === date.getMonth() && 
      job.date.getFullYear() === date.getFullYear()
    );
    
    // Create and show modal with day's jobs
    console.log(`Jobs for ${date.toDateString()}:`, dayJobs);
  }
  
  // Working hours management
  function renderWorkingHours() {
    const workingHoursGrid = document.querySelector('.working-hours-grid');
    workingHoursGrid.innerHTML = '';
    
    const days = [
      { id: 'mon', name: 'Monday' },
      { id: 'tue', name: 'Tuesday' },
      { id: 'wed', name: 'Wednesday' },
      { id: 'thu', name: 'Thursday' },
      { id: 'fri', name: 'Friday' },
      { id: 'sat', name: 'Saturday' },
      { id: 'sun', name: 'Sunday' }
    ];
    
    days.forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.className = 'day-schedule';
      dayEl.innerHTML = `
        <h4>${day.name}</h4>
        <div class="time-range">
          <input type="time" id="${day.id}-start" value="09:00">
          <span>to</span>
          <input type="time" id="${day.id}-end" value="17:00">
        </div>
        <label>
          <input type="checkbox" id="${day.id}-available" checked>
          Available
        </label>
      `;
      workingHoursGrid.appendChild(dayEl);
    });
  }
  
  // Unavailable days selector
  function renderDaySelector() {
    const daySelector = document.querySelector('.day-selector');
    daySelector.innerHTML = '';
    
    const days = ['Public Holidays', 'Vacation', 'Sick Leave', 'Personal Day'];
    
    days.forEach(day => {
      const id = day.toLowerCase().replace(' ', '-');
      daySelector.innerHTML += `
        <input type="checkbox" id="${id}" class="day-checkbox">
        <label for="${id}">${day}</label>
      `;
    });
  }
  
  function saveAvailability() {
    // Collect all working hours and availability
    const availability = {
      mon: getDayAvailability('mon'),
      tue: getDayAvailability('tue'),
      wed: getDayAvailability('wed'),
      thu: getDayAvailability('thu'),
      fri: getDayAvailability('fri'),
      sat: getDayAvailability('sat'),
      sun: getDayAvailability('sun'),
      unavailable: Array.from(document.querySelectorAll('.day-checkbox:checked')).map(cb => cb.id)
    };
    
    console.log('Saving availability:', availability);
    alert('Availability settings saved successfully!');
    
    // In a real app, you would send this to your backend:
    // fetch('/api/availability', { method: 'POST', body: JSON.stringify(availability) })
  }
  
  function getDayAvailability(day) {
    return {
      start: document.getElementById(`${day}-start`).value,
      end: document.getElementById(`${day}-end`).value,
      available: document.getElementById(`${day}-available`).checked
    };
  }
  
  // Initialize when schedule section is shown
  document.querySelector('.sidebar-nav a[data-section="schedule"]').addEventListener('click', initCalendar);
  
});
document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const taskList = document.getElementById('task-list');
  const addTaskForm = document.getElementById('add-task-form');
  const taskTitleInput = document.getElementById('task-title');
  const selectedDayElement = document.getElementById('selected-day');

  let tasks = {}; // Store tasks by date
  let selectedDay = null;

  // Generate calendar days
  function generateCalendar() {
    calendar.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
      const day = document.createElement('div');
      day.className = 'day';
      day.textContent = i;
      day.addEventListener('click', () => selectDay(i));
      calendar.appendChild(day);
    }
  }

  // Select a day
  function selectDay(day) {
    selectedDay = `2025-05-${String(day).padStart(2, '0')}`;
    selectedDayElement.textContent = `May ${day}, 2025`;

    document.querySelectorAll('.day').forEach((d) => d.classList.remove('selected'));
    document.querySelector(`.day:nth-child(${day})`).classList.add('selected');

    loadTasks();
  }

  // Load tasks for the selected day
  function loadTasks() {
    taskList.innerHTML = '';
    if (tasks[selectedDay] && tasks[selectedDay].length > 0) {
      tasks[selectedDay].forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '✖';
        deleteButton.className = 'delete-task';
        deleteButton.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
      });
    } else {
      taskList.innerHTML = '<li>No tasks for this day</li>';
    }
  }

  // Add a new task
  addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedDay) {
      alert('Please select a day first!');
      return;
    }

    const taskTitle = taskTitleInput.value;
    if (!tasks[selectedDay]) {
      tasks[selectedDay] = [];
    }
    tasks[selectedDay].push(taskTitle);
    taskTitleInput.value = '';
    loadTasks();
  });

  // Delete a task
  function deleteTask(index) {
    tasks[selectedDay].splice(index, 1);
    loadTasks();
  }

  generateCalendar();
  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('data-section');
    document.querySelectorAll('.content-section').forEach((section) => {
      section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
  });
});
});

