document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // 2. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, revealOptions);
  
  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 4. Typewriter Effect
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = ['Software Engineer', 'Backend Developer', 'Web Developer', 'Mobile Developer', 'API Designer', 'Problem Solver'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50; // Deletion speed
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100; // Typing speed
      }

      // Word complete
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before next word
      }

      setTimeout(type, typingDelay);
    };

    // Start typewriter effect
    setTimeout(type, 500);
  }

  // 5. Particle Background
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 3 + 2; // random 2-5px
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDuration = `${Math.random() * 20 + 15}s`; // 15-35s
      particle.style.animationDelay = `${Math.random() * 20}s`; // 0-20s
      particle.style.opacity = (Math.random() * 0.4 + 0.2).toString(); // 0.2-0.6
      
      particlesContainer.appendChild(particle);
    }
  }

  // 6. Active Nav Link Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  let isScrolling = false;

  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
          const sectionTop = section.offsetTop - 150; // Offset for sticky header
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');

          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
          }
        });

        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });
        
        isScrolling = false;
      });
      isScrolling = true;
    }
  });

  // 7. Category Filter Tabs
  const filterTabContainers = document.querySelectorAll('.filter-tabs');
  
  filterTabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.filter-tab');
    
    // Determine which grid to filter by finding the next sibling grid
    let targetGrid = container.nextElementSibling;
    while (targetGrid && !targetGrid.classList.contains('skills-grid') && !targetGrid.classList.contains('projects-grid')) {
      targetGrid = targetGrid.nextElementSibling;
    }
    
    if (targetGrid) {
      const cards = targetGrid.querySelectorAll('.skill-card, .project-card');
      
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          // Remove active class from all sibling tabs
          tabs.forEach(t => t.classList.remove('active'));
          // Add active class to clicked tab
          tab.classList.add('active');
          
          const filterValue = tab.getAttribute('data-filter');
          
          // Animate cards out
          cards.forEach(card => {
            card.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
          });
          
          // Wait briefly, then filter and animate in
          setTimeout(() => {
            cards.forEach(card => {
              const cardCategory = card.getAttribute('data-category');
              if (filterValue === 'all' || filterValue === cardCategory) {
                card.style.display = ''; // Show matching cards
                
                // Allow display change to take effect before animating opacity
                requestAnimationFrame(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                });
              } else {
                card.style.display = 'none'; // Hide non-matching cards
              }
            });
          }, 100); 
        });
      });
    }
  });
});
