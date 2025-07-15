// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // Preloader
  // ======================
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 1000);
  });

  // ======================
  // Mobile Navigation
  // ======================
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  // ======================
  // Sticky Navigation
  // ======================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ======================
  // Smooth Scrolling
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  // ======================
  // Animate Elements on Scroll
  // ======================
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-text, .skill-category, .project-card, .timeline-item');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initialize animation state
  window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.animate-text, .skill-category, .project-card, .timeline-item');
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.5s ease';
    });
    
    // Hero text animations (staggered)
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-tagline, .hero-description, .cta-button');
    heroElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
    });
    
    animateOnScroll();
  });

  window.addEventListener('scroll', animateOnScroll);

  // ======================
  // Skill Bar Animations
  // ======================
  const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      const percent = item.getAttribute('data-percent');
      const progressBar = item.querySelector('.skill-progress');
      
      if (isElementInViewport(item)) {
        progressBar.style.width = `${percent}%`;
      }
    });
  };

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  };

  window.addEventListener('load', animateSkillBars);
  window.addEventListener('scroll', animateSkillBars);

  // ======================
  // Project Card Hover Effects
  // ======================
  document.querySelectorAll('.project-card').forEach(card => {
    const overlay = card.querySelector('.project-overlay');
    
    card.addEventListener('mouseenter', () => {
      overlay.style.opacity = '1';
      overlay.querySelector('.overlay-content').style.transform = 'translateY(0)';
    });
    
    card.addEventListener('mouseleave', () => {
      overlay.style.opacity = '0';
      overlay.querySelector('.overlay-content').style.transform = 'translateY(20px)';
    });
  });

  // ======================
  // Back to Top Button
  // ======================
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ======================
  // Form Submission
  // ======================
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const action = this.getAttribute('action');
      
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          alert('Message sent successfully!');
          this.reset();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch(error => {
        alert('There was a problem sending your message. Please try again later.');
        console.error('Error:', error);
      });
    });
  }

  // ======================
  // Timeline Animation
  // ======================
  const timelineItems = document.querySelectorAll('.timeline-item');
  window.addEventListener('scroll', () => {
    timelineItems.forEach(item => {
      if (isElementInViewport(item)) {
        item.classList.add('visible');
      }
    });
  });

  // Initialize timeline items as invisible
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
  });
});