// ===============================
// Typing effect for home page
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const text = "Welcome to TechnicalRayyan – Futuristic Web Development";
  const el = document.getElementById('typing-text');
  if (el) {
    el.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80);
      }
    }
    setTimeout(type, 300);
  }
});

// ===============================
// Simple cursor (hidden on mobile)
// ===============================
(function createCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  if ('ontouchstart' in window) cursor.style.display = 'none';
})();

// ===============================
// Mobile navbar toggle (Hamburger)
// ===============================
const navToggle = document.createElement('div');
navToggle.className = 'hamburger'; // use CSS hamburger styles
navToggle.innerHTML = '&#9776;'; // ☰ icon
document.querySelector('.navbar')?.appendChild(navToggle);

const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('open');
});

// Close menu on nav click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      navToggle.classList.remove('open');
    }
  });
});

// ===============================
// Smooth scrolling for nav links
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===============================
// Sticky navbar on scroll
// ===============================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===============================
// Scroll reveal animations
// ===============================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// ===============================
// Contact form validation + backend
// ===============================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();
    const responseMsg = document.getElementById('responseMsg');

    if (!name || !email || !message) {
      responseMsg.textContent = "⚠️ Please fill out all fields.";
      responseMsg.style.color = "orange";
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      responseMsg.textContent = "⚠️ Please enter a valid email.";
      responseMsg.style.color = "orange";
      return;
    }

    try {
      // Send to backend
      const res = await fetch("/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();
      if (data.success) {
        responseMsg.textContent = "✅ Thank you, " + name + "! Your message has been sent.";
        responseMsg.style.color = "lightgreen";
        contactForm.reset();
      } else {
        responseMsg.textContent = "❌ Failed to send. Please try again.";
        responseMsg.style.color = "red";
      }
    } catch (err) {
      responseMsg.textContent = "⚠️ Network error. Please try later.";
      responseMsg.style.color = "red";
    }
  });
}
