// Modal functionality
function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}

// Price update based on category
const category = document.getElementById('category');
const price = document.getElementById('price');
if (category && price) {
  category.addEventListener('change', function() {
    switch (category.value) {
      case 'Plumbing': price.textContent = '₺45'; break;
      case 'Electrical': price.textContent = '₺50'; break;
      case 'Appliance Repair': price.textContent = '₺55'; break;
      case 'Carpentry': price.textContent = '₺40'; break;
      case 'Painting': price.textContent = '₺35'; break;
      case 'Cleaning Services': price.textContent = '₺30'; break;
      case 'Gardening': price.textContent = '₺35'; break;
      case 'Handyman Services': price.textContent = '₺40'; break;
      default: price.textContent = '₺40';
    }
  });
}

// FAQ toggle with accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(faqItem => {
      faqItem.classList.remove('open');
    });
    
    // Open clicked item if it wasn't open before
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Form validation
document.querySelector('.account-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  
  // Email validation
  if (!email.includes('@')) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Phone validation (numbers only)
  if (!/^\d+$/.test(phone)) {
    alert('Please enter a valid phone number (numbers only)');
    return;
  }

  // Phone length validation
  if (phone.length < 10) {
    alert('Phone number must be at least 10 digits long');
    return;
  }
  
  // If validation passes
  alert('Thank you for signing up! We will contact you soon.');
  closeModal();
});

// Add input validation for phone field
document.getElementById('phone').addEventListener('input', function(e) {
  // Remove any non-numeric characters
  this.value = this.value.replace(/[^0-9]/g, '');
});

// Get Started button functionality
document.querySelector('.btn-primary').addEventListener('click', function() {
  openModal();
});

// Help button functionality
function showHelp() {
  // Use the current directory path
  window.location.href = './contact.html';
}

// Add help button to the page
document.addEventListener('DOMContentLoaded', function() {
  const helpButton = document.createElement('button');
  helpButton.className = 'help-button';
  helpButton.innerHTML = '<i class="fas fa-question-circle"></i> Help';
  helpButton.onclick = showHelp;
  document.body.appendChild(helpButton);
});
