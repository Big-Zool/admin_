function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  
  function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('click', (event) => {
      const modal = document.getElementById('modal');
      if (event.target === modal) {
        closeModal();
      }
    });
  
    const accountForm = document.querySelector('.account-form');
    if (accountForm) {
      accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Account created successfully!');
        closeModal();
      });
    }
  
    const skillSelect = document.getElementById('skill-select');
    const earningsDisplay = document.querySelector('.earnings-display .amount');
    
    const earningsData = {
      plumbing: '₺200-₺400',
      electrical: '₺250-₺450',
      hvac: '₺300-₺500'
    };
  
    if (skillSelect && earningsDisplay) {
      skillSelect.addEventListener('change', (e) => {
        const selectedSkill = e.target.value.toLowerCase();
        earningsDisplay.textContent = earningsData[selectedSkill];
      });
    }
  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.step-card, .calculator-content');
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add('animated');
        }
      });
    };
  
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  });