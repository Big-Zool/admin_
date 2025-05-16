document.addEventListener('DOMContentLoaded', function() {
  // Current date tracking for calendar
  let currentDate = new Date(2025, 4); // Start with May 2025 to match your initial state
  let selectedDay = null;
  let tasks = {}; // Store tasks by date

  // Initialize navigation buttons
  const prevButton = document.getElementById('prev-period');
  const nextButton = document.getElementById('next-period');

  // Add event listeners for navigation buttons
  if (prevButton) {
    prevButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
      return false; // Prevent default action
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
      return false; // Prevent default action
    });
  }

  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
  
      const sectionId = link.getAttribute('data-section');
      const href = link.getAttribute('href');
  
      // Show the matching section
      document.querySelectorAll('.content-section').forEach((section) => {
        section.classList.remove('active');
      });
      document.getElementById(sectionId)?.classList.add('active');
  
      // Update sidebar highlighting
      document.querySelectorAll('.sidebar-nav li').forEach((item) => {
        item.classList.remove('active');
      });
      link.parentElement.classList.add('active');
  
      // Handle scrolling if it's a scroll-link
      if (link.classList.contains('scroll-link') && href) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
  
      // Re-initialize calendar if "Schedule" is clicked
      if (sectionId === 'schedule') {
        renderCalendar();
      }
    });
  });
  


  
    // Initialize Chart.js for earnings visualization
    const earningsCtx = document.getElementById('earnings-chart').getContext('2d');
    
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
    const mainContent = document.querySelector('.main-content');
    
    if (mobileMenuBtn && sidebar) {
      // Handle mobile menu button click
      mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.add('active');
        mobileMenuBtn.style.display = 'none';
      });

      // Close sidebar when clicking outside
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== mobileMenuBtn) {
          sidebar.classList.remove('active');
          mobileMenuBtn.style.display = 'block';
        }
      });

      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            mobileMenuBtn.style.display = window.innerWidth <= 768 ? 'block' : 'none';
          }
        }, 250);
      });
    }
  
    // Notification System
    const notificationsLink = document.querySelector('.notifications-link');
    const notificationBadge = document.querySelector('.notification-badge');
    const notificationCount = document.querySelector('.notification-count');

    // Sample notifications data
    const notifications = [
      {
        type: 'message',
        icon: 'fa-envelope',
        message: 'New message from Chris Daël',
        time: '2 hours ago',
        unread: true
      },
      {
        type: 'rating',
        icon: 'fa-star',
        message: 'You received a 5-star rating from Amadou Ty',
        time: '1 day ago',
        unread: true
      },
      {
        type: 'job',
        icon: 'fa-calendar-check',
        message: 'New job booked for tomorrow at 10:00 AM',
        time: '3 hours ago',
        unread: true
      }
    ];

    // Create notification dropdown
    const notificationDropdown = document.createElement('div');
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.innerHTML = `
      <div class="notification-header">
        <h4>Notifications</h4>
        <span class="mark-all-read">Mark all as read</span>
      </div>
      <div class="notification-list">
        ${notifications.map(notification => `
          <div class="notification-item ${notification.unread ? 'unread' : ''}">
            <div class="notification-icon">
              <i class="fas ${notification.icon}"></i>
            </div>
            <div class="notification-content">
              <p>${notification.message}</p>
              <span class="notification-time">${notification.time}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="notification-footer">
        <a href="#">View all notifications</a>
      </div>
    `;

    // Add notification dropdown to the page
    document.querySelector('.profile').appendChild(notificationDropdown);

    // Handle notification click
    if (notificationsLink) {
      notificationsLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        notificationDropdown.classList.toggle('active');
      });
    }

    // Mark all as read functionality
    const markAllRead = notificationDropdown.querySelector('.mark-all-read');
    if (markAllRead) {
      markAllRead.addEventListener('click', () => {
        const unreadItems = notificationDropdown.querySelectorAll('.unread');
        unreadItems.forEach(item => {
          item.classList.remove('unread');
        });
        
        // Update notification counts
        if (notificationBadge) notificationBadge.style.display = 'none';
        if (notificationCount) notificationCount.style.display = 'none';
      });
    }

    // Close notification dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!notificationDropdown.contains(e.target) && !notificationsLink.contains(e.target)) {
        notificationDropdown.classList.remove('active');
      }
    });
  
    // Profile Dropdown Functionality
    const profile = document.querySelector('.profile');
    const dropdown = document.querySelector('.profile-dropdown');

    if (profile && dropdown) {
      // Toggle dropdown on profile click
      profile.addEventListener('click', (e) => {
        e.stopPropagation();
        profile.classList.toggle('active');
        
        // Ensure dropdown is visible when active
        if (profile.classList.contains('active')) {
          dropdown.style.display = 'block';
          setTimeout(() => {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
          }, 10);
        } else {
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
          dropdown.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 300);
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!profile.contains(e.target)) {
          profile.classList.remove('active');
          dropdown.style.opacity = '0';
          dropdown.style.visibility = 'hidden';
          dropdown.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            dropdown.style.display = 'none';
          }, 300);
        }
      });

      // Prevent dropdown from closing when clicking inside it
      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
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
    if (!calendarEl) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update header with current period
    const currentPeriodEl = document.getElementById('current-period');
    if (currentPeriodEl) {
      currentPeriodEl.textContent = new Date(year, month).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }
    
    calendarEl.innerHTML = '';
    
    // Add day headers
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayHeader = document.createElement('div');
      dayHeader.className = 'calendar-day-header';
      dayHeader.textContent = day;
      calendarEl.appendChild(dayHeader);
    });
    
    // Calculate calendar days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      emptyDay.className = 'calendar-day empty';
      calendarEl.appendChild(emptyDay);
    }
    
    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar-day';
      dayEl.textContent = i;
      
      const dayDate = new Date(year, month, i);
      const dateString = dayDate.toISOString().split('T')[0];
      
      // Mark today
      if (dayDate.toDateString() === today.toDateString()) {
        dayEl.classList.add('today');
      }
      
      // Mark selected day
      if (selectedDay === dateString) {
        dayEl.classList.add('selected');
      }
      
      // Add tasks indicator if there are tasks
      if (tasks[dateString] && tasks[dateString].length > 0) {
        dayEl.classList.add('has-jobs');
        dayEl.innerHTML = `${i}<div class="day-jobs">${tasks[dateString].length} task${tasks[dateString].length > 1 ? 's' : ''}</div>`;
      }
      
      // Day click handler
      dayEl.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
        dayEl.classList.add('selected');
        selectedDay = dateString;
        
        const selectedDayEl = document.getElementById('selected-day');
        if (selectedDayEl) {
          selectedDayEl.textContent = dayDate.toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          });
        }
        loadTasks();
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
  document.querySelectdocument.querySelector('.sidebar-nav a[data-section="schedule"]')
  .addEventListener('click', () => {
    // Show the correct section
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    document.getElementById('schedule').classList.add('active');

    // Set sidebar active class
    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
    document.querySelector('.sidebar-nav li a[data-section="schedule"]').parentElement.classList.add('active');

    // Reinitialize the calendar
    initCalendar(); // <== this is important
  });
or('.sidebar-nav a[data-section="schedule"]').addEventListener('click', initCalendar);
  
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

