const skillsHeaders = document.querySelectorAll('.skills__header');

skillsHeaders.forEach((header) => {
  header.addEventListener('click', () => {
    const skillContent = header.parentElement;
    const isOpen = skillContent.classList.contains('skills__open');
    
    // Collapse all
    document.querySelectorAll('.skills__content').forEach((el) => {
      el.classList.remove('skills__open');
      el.classList.add('skills__close');
      el.querySelectorAll('.skills__pct').forEach(pct => pct.style.width = '0');
    });

    // Expand selected
    if (!isOpen) {
      skillContent.classList.add('skills__open');
      skillContent.classList.remove('skills__close');

      skillContent.querySelectorAll('.skills__pct').forEach((pct) => {
        pct.style.width = pct.getAttribute('data-skill');
      });
    }
  });
});
