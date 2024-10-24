const toggleButton = document.getElementById('darkModeToggle');
const images = document.querySelectorAll('img[data-light][data-dark]'); // Select images with both data-light and data-dark attributes

toggleButton.addEventListener('click', () => {
    // Toggle dark mode class on the body
    document.body.classList.toggle('dark-mode');

    // Check if dark mode is currently active
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Loop through each image and update its src attribute based on the mode
    images.forEach(img => {
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        img.src = isDarkMode ? darkSrc : lightSrc;
    });
});
