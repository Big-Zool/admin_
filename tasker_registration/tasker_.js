document.addEventListener('DOMContentLoaded', () => {
    // Modal Functions
    function openModal() {
        document.getElementById('modal').style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    function closeModal() {
        document.getElementById('modal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Form submission
    const accountForm = document.querySelector('.account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to your server
            alert('Account created successfully!');
            closeModal();
        });
    }
    // Add this INSIDE the DOMContentLoaded event listener
// Right after the existing form submission code
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
  
    // Add this after the accountForm event listener
    const countryCodeSelect = document.querySelector('.country-code');
    if (countryCodeSelect) {
      countryCodeSelect.addEventListener('change', function() {
        console.log('Selected country code:', this.value);
      });
    }
  
    // Rest of existing code...
  });

    // Earnings Calculator
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

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation Triggers
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