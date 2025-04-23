// dashboard.js

// 1) Mock data for all bookings
const mockBookingData = {
  'MP-1001': {
    customer: 'Abdalla',
    phone: '+90 555 123 4567',
    service: 'Plumbing',
    specs: 'Pipe repair in kitchen',
    technician: 'Mehmet',
    datetime: '2025-04-16T14:00',
    status: 'Completed',
    priority: 'High',
    notes: 'Urgent repair needed',
    timeline: [
      '2025-04-10: Booking created',
      '2025-04-12: Technician assigned'
    ]
  },
  'MP-1002': {
    customer: 'Habibatou',
    phone: '+90 555 987 6543',
    service: 'Electrical',
    specs: 'Fix power outlet',
    technician: 'Ali',
    datetime: '2025-04-16T10:00',
    status: 'In Progress',
    priority: 'Medium',
    notes: 'Customer is at home',
    timeline: [
      '2025-04-11: Booking created',
      '2025-04-13: Technician assigned'
    ]
  },
  'MP-1003': {
    customer: 'John',
    phone: '+90 555 192 8374',
    service: 'HVAC',
    specs: 'AC maintenance',
    technician: 'Ahmet',
    datetime: '2025-04-15T09:00',
    status: 'Pending',
    priority: 'Low',
    notes: 'Check filters',
    timeline: [
      '2025-04-09: Booking created'
    ]
  }
};

// 2) DOMContentLoaded: initialize all UI interactions
document.addEventListener('DOMContentLoaded', function() {
  // Activate all stat cards on page load
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.classList.add('active');
  });

  // ---- Close Modals ----
  document.querySelectorAll('.close-modal').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.closest('.message-modal').classList.remove('active');
    });
  });

  document.querySelectorAll('.message-modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });

  // ---- View Booking Details ----
  document.querySelectorAll('.fa-eye').forEach(function(icon) {
    icon.closest('button').addEventListener('click', function() {
      const id = this.closest('tr').dataset.bookingId;
      const b = mockBookingData[id];
      if (!b) return alert('No data for ' + id);

      document.getElementById('bookingId').textContent = '#' + id;
      document.getElementById('detailCustomer').textContent = b.customer;
      document.getElementById('detailPhone').textContent = b.phone;
      document.getElementById('detailService').textContent = b.service;
      document.getElementById('detailSpecs').textContent = b.specs;
      document.getElementById('detailTechnician').textContent = b.technician;
      document.getElementById('detailDateTime').textContent = b.datetime;
      document.getElementById('bookingTimeline').innerHTML =
        b.timeline.map(evt => `<li>${evt}</li>`).join('');

      document.getElementById('bookingDetailModal').classList.add('active');
    });
  });

  // ---- Edit Booking ----
  document.querySelectorAll('.fa-edit').forEach(function(icon) {
    icon.closest('button').addEventListener('click', function() {
      const id = this.closest('tr').dataset.bookingId;
      const b = mockBookingData[id];
      if (!b) return alert('No data for ' + id);

      document.getElementById('editBookingId').textContent = '#' + id;
      document.getElementById('editStatus').value = b.status;
      document.getElementById('editTechnician').value = b.technician;
      document.getElementById('editDateTime').value = b.datetime;
      document.getElementById('editPriority').value = b.priority;
      document.getElementById('editNotes').value = b.notes;

      document.getElementById('editBookingModal').classList.add('active');
    });
  });

  // ---- Save Edited Booking ----
  document.getElementById('editBookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('editBookingId').textContent.replace('#', '');
    const form = e.target;

    const updated = {
      status: form.querySelector('#editStatus').value,
      technician: form.querySelector('#editTechnician').value,
      datetime: form.querySelector('#editDateTime').value,
      priority: form.querySelector('#editPriority').value,
      notes: form.querySelector('#editNotes').value
    };

    mockBookingData[id] = {
      ...mockBookingData[id],
      ...updated
    };

    const row = document.querySelector(`tr[data-booking-id="${id}"]`);
    row.querySelector('td:nth-child(6) .badge').textContent = updated.status;
    row.querySelector('td:nth-child(5)').textContent = updated.datetime.split('T')[0];

    const detailModal = document.getElementById('bookingDetailModal');
    if (detailModal.classList.contains('active')) {
      document.getElementById('detailDateTime').textContent = updated.datetime;
      document.getElementById('detailTechnician').textContent = updated.technician;
    }

    document.getElementById('editBookingModal').classList.remove('active');
    alert('Booking updated successfully!');
  });

  // ---- View Message Modal ----
  document.querySelectorAll('.message-item').forEach(function(item) {
    item.addEventListener('click', function() {
      const sender = this.querySelector('.message-header h4').textContent;
      const time = this.querySelector('.message-header .time').textContent;
      const message = this.querySelector('.message-content p').textContent;

      document.getElementById('modalSenderName').textContent = sender;
      document.getElementById('modalSendTime').textContent = time;
      document.getElementById('modalMessageContent').textContent = message;
      document.querySelector('#messageModal .sender-avatar').textContent = sender.charAt(0);

      document.getElementById('messageModal').classList.add('active');
    });
  });

  // ---- Reply Button Toggle ----
  document.querySelector('.reply-btn').addEventListener('click', function() {
    const replyForm = document.getElementById('replyForm');
    replyForm.style.display = replyForm.style.display === 'flex' ? 'none' : 'flex';
  });

  // ---- Handle Send Reply ----
  document.querySelector('.send-reply-btn').addEventListener('click', function() {
    const message = document.querySelector('#replyForm textarea').value.trim();
    if (!message) return alert('Please type a reply before sending.');

    // Simulate sending the message
    alert('Reply sent:\n\n' + message);

    // Reset form
    document.querySelector('#replyForm textarea').value = '';
    document.getElementById('replyForm').style.display = 'none';
  });

    // Sidebar toggle functionality
  document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.admin-sidebar').classList.toggle('active');
    document.querySelector('.admin-main').classList.toggle('sidebar-collapsed');
  });

  

});

