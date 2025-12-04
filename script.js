/* ------------------------------
   DARK / LIGHT MODE TOGGLE
------------------------------ */
function toggleMode() {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');

  const isDark = document.body.classList.contains('dark-mode');
  const text = isDark ? "Light Mode" : "Dark Mode";
  const desktopBtn = document.getElementById('toggleMode');
  const mobileBtn = document.getElementById('toggleModeMobile');

  if (isDark) {
      // DARK MODE ACTIVE → show sun icon + "Light Mode"
      desktopBtn.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
      if (mobileBtn) mobileBtn.innerHTML = '<i class="bi bi-sun"></i> Light Mode';
  } else {
      // LIGHT MODE ACTIVE → show moon icon + "Dark Mode"
      desktopBtn.innerHTML = '<i class="bi bi-moon"></i> Dark Mode';
      if (mobileBtn) mobileBtn.innerHTML = '<i class="bi bi-moon"></i> Dark Mode';
  }

}

document.getElementById('toggleMode').addEventListener('click', toggleMode);

const toggleModeMobile = document.getElementById('toggleModeMobile');
if (toggleModeMobile) {
  toggleModeMobile.addEventListener('click', toggleMode);
}


/* ------------------------------
   SIDEBAR + OVERLAY TOGGLE
------------------------------ */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const toggleBtn = document.getElementById('sidebarToggle');
const menuIcon = document.getElementById('menuIcon');
const sidebarLinks = document.querySelectorAll('.sidebar a');

let isOpen = false;

function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  document.body.classList.remove('sidebar-open');

  setTimeout(() => overlay.style.display = 'none', 300);

  menuIcon.textContent = '☰';
  isOpen = false;
}

toggleBtn.addEventListener('click', () => {
  if (!isOpen) {
    sidebar.classList.add('active');
    overlay.style.display = 'block';
    overlay.classList.add('active');
    menuIcon.textContent = '✕';
    document.body.classList.add('sidebar-open');
    isOpen = true;
  } else {
    closeSidebar();
  }
});

overlay.addEventListener('click', closeSidebar);

/* Auto-close sidebar when a link is clicked */
sidebarLinks.forEach(link => {
  link.addEventListener('click', closeSidebar);
});


/* ------------------------------
   ACTIVE NAV LINK ON SCROLL
------------------------------ */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

