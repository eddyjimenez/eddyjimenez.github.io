document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for dark mode preference on page load
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        updateImagesForDarkMode(true);
    }

    // Dark Mode Toggle Functionality
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
        console.log('Dark Mode Toggle button found!');
        toggleButton.addEventListener('click', () => {
            const darkModeEnabled = document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
            updateImagesForDarkMode(darkModeEnabled);
        });
    } else {
        console.error('Dark Mode Toggle button NOT found!');
    }

    // GSAP Animations
    animateWithGSAP('.main-logo', { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 1.5 });
    animateWithGSAP('.persona-image', { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 1.5 });
    animateWithGSAP('.flowchart-image', { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 1.5 });
    animateWithGSAP('.full-page-image', { opacity: 0, rotateY: 90 }, { opacity: 1, rotateY: 0, duration: 1.5 });

    // Load Carousel
    loadCarousel();

    // Quiz Submission
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const answer = document.querySelector('input[name="q1"]:checked');
            const result = document.getElementById('quiz-result');
            if (answer && answer.value === 'correct') {
                result.textContent = 'Correct! HTML stands for Hyper Text Markup Language.';
            } else {
                result.textContent = 'Incorrect! Try again.';
            }
        });
    }


    

    // Code Editor Functionality
    const runCodeButton = document.getElementById('run-code');
    if (runCodeButton) {
        runCodeButton.addEventListener('click', () => {
            const html = document.getElementById('html-code').value;
            const css = `<style>${document.getElementById('css-code').value}</style>`;
            const js = `<script>${document.getElementById('js-code').value}<\/script>`;
            const output = document.getElementById('output');
            output.contentDocument.body.innerHTML = html + css + js;
        });
    }

    // Clear Code Button
    const clearCodeButton = document.getElementById('clear-code');
    if (clearCodeButton) {
        clearCodeButton.addEventListener('click', () => {
            const htmlCode = document.getElementById('html-code');
            const cssCode = document.getElementById('css-code');
            const jsCode = document.getElementById('js-code');
            const output = document.getElementById('output');

            // Clear text areas
            htmlCode.value = '';
            cssCode.value = '';
            jsCode.value = '';

        // Clear the iframe content
            output.contentDocument.body.innerHTML = '';
    });
}

    // Filter Functionality for Resources Section
    const filterInput = document.getElementById('filter-input');
    const clearFilter = document.getElementById('clear-filter');
    const resourceCategories = document.querySelectorAll('.resource-category');

    if (filterInput && clearFilter) {
        filterInput.addEventListener('input', () => {
            const filterText = filterInput.value.toLowerCase();
            resourceCategories.forEach((category) => {
                const text = category.innerText.toLowerCase();
                category.style.display = text.includes(filterText) ? 'block' : 'none';
            });
        });

        clearFilter.addEventListener('click', () => {
            filterInput.value = '';
            resourceCategories.forEach((category) => {
                category.style.display = 'block';
            });
        });
    }

    // Retrieve Saved Preferences on Page Load
    const savedTheme = localStorage.getItem('theme');
    const savedNotifications = localStorage.getItem('notifications') === 'enabled';

    const themeSelect = document.getElementById('theme');
    const notificationsCheckbox = document.getElementById('notifications');

    if (themeSelect && savedTheme) themeSelect.value = savedTheme;
    if (notificationsCheckbox) notificationsCheckbox.checked = savedNotifications;

    console.log('User preferences loaded:', { theme: savedTheme, notifications: savedNotifications });
});

// GSAP Animation Helper Function
function animateWithGSAP(selector, fromProps, toProps) {
    if (document.querySelector(selector)) {
        gsap.fromTo(selector, fromProps, toProps);
    } else {
        console.warn(`GSAP target ${selector} not found.`);
    }
}

// Function to Load Carousel Content
function loadCarousel() {
    fetch('carousel.html')
        .then((response) => response.text())
        .then((data) => {
            const carouselPlaceholder = document.querySelector('.carousel-placeholder');
            if (carouselPlaceholder) {
                carouselPlaceholder.innerHTML = data;
                initializeCarousel(); // Call the function to initialize the carousel events after loading
            }
        })
        .catch((error) => console.error('Error loading carousel:', error));
}

// Function to Update Images for Dark Mode
function updateImagesForDarkMode(isDarkMode) {
    const images = document.querySelectorAll('img[data-light][data-dark]');
    images.forEach((img) => {
        const lightSrc = img.getAttribute('data-light');
        const darkSrc = img.getAttribute('data-dark');
        img.src = isDarkMode ? darkSrc : lightSrc;
    });
}

// Function to Initialize Carousel
function initializeCarousel() {
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');

    if (slides.length > 0 && prevButton && nextButton) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }

        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            showSlide(currentSlideIndex);
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Automatically move to the next slide every 3 seconds
        setInterval(nextSlide, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const subscriptionForm = document.getElementById('subscription-form');
    const subscriptionMessage = document.getElementById('subscription-message');

    subscriptionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        const emailInput = document.getElementById('email');
        const email = emailInput.value;

        // Perform basic email validation
        if (validateEmail(email)) {
            subscriptionMessage.style.color = 'green';
            subscriptionMessage.textContent = `Thank you for subscribing, ${email}!`;
            subscriptionMessage.style.display = 'block';

            // Simulate sending the email to a server
            setTimeout(() => {
                console.log(`Email ${email} added to subscription list.`);
            }, 500);

            emailInput.value = ''; // Clear input field
        } else {
            subscriptionMessage.style.color = 'red';
            subscriptionMessage.textContent = 'Please enter a valid email address.';
            subscriptionMessage.style.display = 'block';
        }
    });

    // Basic email validation function
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const helpButton = document.getElementById('help-button');
    const helpSidebar = document.getElementById('help-sidebar');
    const closeHelpButton = document.getElementById('close-help');

    // Open the help sidebar
    helpButton.addEventListener('click', () => {
        helpSidebar.classList.add('open');
    });

    // Close the help sidebar
    closeHelpButton.addEventListener('click', () => {
        helpSidebar.classList.remove('open');
    });

    // Close the sidebar when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!helpSidebar.contains(event.target) && event.target !== helpButton) {
            helpSidebar.classList.remove('open');
        }
    });
});


// URL of your published CSV file
const CSV_URL =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ93mSMEHsXdRiUCXdepJWJ28Weyq8mYpZ8xKLsLJi49rIgt2x27woa-T_1MrjNaNMAoVDWpc_obdrI/pub?output=csv';

fetch(CSV_URL)
    .then((response) => response.text())
    .then((csvData) => {
        const rows = csvData.split('\n').map((row) => row.split(','));
        const headers = rows[0].map((header) => header.trim()); // Trim headers to remove unwanted spaces
        const responses = rows.slice(1);

        // Filter valid questions (exclude empty headers or invalid data)
        const validQuestions = headers.filter((header) => header && !header.toLowerCase().includes('timestamp'));
        console.log('Valid Questions:', validQuestions);

        validQuestions.forEach((header, index) => {
            const questionIndex = headers.indexOf(header);
            const counts = {};

            responses.forEach((row) => {
                const answer = row[questionIndex]?.trim();
                if (answer) {
                    counts[answer] = (counts[answer] || 0) + 1;
                }
            });

            console.log(`Counts for "${header}":`, counts);

            // Generate the chart
            const chartContainer = document.getElementById('charts');
            const chartItem = document.createElement('div');
            chartItem.className = 'chart-item';

            const chartTitle = document.createElement('div');
            chartTitle.className = 'chart-title';
            chartTitle.textContent = header || "Untitled Question"; // Handle empty headers

            const canvas = document.createElement('canvas');
            canvas.id = `chart-${index}`;

            chartItem.appendChild(chartTitle);
            chartItem.appendChild(canvas);
            chartContainer.appendChild(chartItem);

            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(counts),
                    datasets: [
                        {
                            data: Object.values(counts),
                            backgroundColor: ['#4caf50', '#f44336', '#ff9800', '#2196f3', '#9c27b0'],
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: { position: 'right' },
                    },
                },
            });
        });
    })
    .catch((error) => console.error('Error fetching or processing CSV data:', error));
