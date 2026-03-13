/* ===============================
   DARK / LIGHT MODE TOGGLE
=============================== */
function toggleMode() {
  const body = document.body;
  const desktopBtn = document.getElementById('toggleMode');
  const mobileBtn = document.getElementById('toggleModeMobile');

  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  const isDark = body.classList.contains('dark-mode');

  // Update button icons and text
  const iconHTML = isDark 
    ? '<i class="bi bi-sun"></i> Light Mode' 
    : '<i class="bi bi-moon"></i> Dark Mode';

  desktopBtn.innerHTML = iconHTML;
  if (mobileBtn) mobileBtn.innerHTML = iconHTML;
}

document.getElementById('toggleMode').addEventListener('click', toggleMode);
const toggleModeMobile = document.getElementById('toggleModeMobile');
if (toggleModeMobile) toggleModeMobile.addEventListener('click', toggleMode);


/* ===============================
   SIDEBAR + OVERLAY TOGGLE
=============================== */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('sidebarToggle');
const menuIcon = document.getElementById('menuIcon');
const sidebarLinks = document.querySelectorAll('.sidebar a');

let isSidebarOpen = false;

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('sidebar-open');
  setTimeout(() => overlay.style.display = 'none', 300);
  menuIcon.textContent = '☰';
  isSidebarOpen = false;
}

toggleBtn.addEventListener('click', () => {
  if (!isSidebarOpen) {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
    overlay.classList.add('active');
    menuIcon.textContent = '✕';
    document.body.classList.add('sidebar-open');
    isSidebarOpen = true;
  } else {
    closeSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);
sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));


/* ===============================
   ACTIVE NAV LINK ON SCROLL
=============================== */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});


/* ===============================
   MAP SETUP (Leaflet)
=============================== */
const map = L.map('map').setView([14.4507, 120.9820], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

L.marker([14.4507, 120.9820])
  .addTo(map)
  .bindPopup('Las Piñas City, Philippines')
  .openPopup();


/* ===============================
   CONTACT CARD TOGGLE
=============================== */
const card = document.querySelector('.contact-card');
const arrow = document.getElementById('toggleArrow');

if (arrow && card) {
  arrow.addEventListener('click', () => {
    card.classList.toggle('expanded');
    arrow.innerHTML = card.classList.contains('expanded') ? '&#9660;' : '&#9650;';
  });
}


/* ===============================
   FADE-IN SECTIONS ON SCROLL
=============================== */
const fadeElements = document.querySelectorAll(".fade-section");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => fadeObserver.observe(el));


/* ===============================
   AUTO-SCROLLING SKILLS ROWS
=============================== */
const marquees = document.querySelectorAll('.skills-row');

marquees.forEach(row => {
  let speed = 1; // pixels per frame
  let pos = 0;

  function scroll() {
    pos -= speed;
    if (Math.abs(pos) >= row.scrollWidth / 2) pos = 0;
    row.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(scroll);
  }

  scroll();
});

/* ===============================
   ABOUT SECTION
=============================== */
const ctx = document.getElementById('skillsChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Frontend', 'Backend', 'MySQL', 'SQA', 'Development Tools'],
        datasets: [{
            label: 'Skill Level',
            data: [90, 80, 70, 95, 100],
            borderColor: '#e63946',
            backgroundColor: 'rgba(230,57,70,0.15)',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        scales: {
            y: {
                min: 0,
                max: 100,
                ticks: {
                    callback: function(value) {
                        return value + '%';
                    }
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }
});