// Tab switching functionality
const homeTab = document.getElementById('homeTab');
const personasTab = document.getElementById('personasTab');
const scenariosTab = document.getElementById('scenariosTab');
const contentDiv = document.getElementById('content');

function loadContent(page) {
    switch (page) {
        case 'home':
            contentDiv.innerHTML = `
                <h1>Welcome to the Home Page!</h1>
                <p>This is the home section. Click the tabs to explore more content.</p>
            `;
            break;
        case 'personas':
            contentDiv.innerHTML = `
                <h1>Our Personas</h1>
                <div class="persona">
                    <img src="https://i.ibb.co/Rzh5ZYr/Woman-1.jpg" alt="Customer 1">
                    <div class="persona-info">
                        <h3>Jane Doe</h3>
                        <p>Jane was struggling with managing her property. Our company helped her streamline the process and reduce stress. Now, she’s enjoying hassle-free property management.</p>
                    </div>
                </div>
                <div class="persona">
                    <img src="https://i.ibb.co/FX9QWwv/Guy-1.jpg" alt="Customer 2">
                    <div class="persona-info">
                        <h3>John Smith</h3>
                        <p>John needed expert advice on how to handle tenant disputes. Thanks to our services, he’s now confident in managing his rentals without any issues.</p>
                    </div>
                </div>
                <div class="persona">
                    <img src="https://i.ibb.co/jzbyqvb/Woman-2.jpg" alt="Customer 3">
                    <div class="persona-info">
                        <h3>Emily Johnson</h3>
                        <p>Emily wanted to improve the security and maintenance of her condo complex. With our help, her complex now runs smoothly and securely.</p>
                    </div>
                </div>
				<div class="persona">
                    <img src="https://i.ibb.co/pwsW2sc/Guy-2.jpg" alt="Customer 4">
                    <div class="persona-info">
                        <h3>Mark Ponzi</h3>
                        <p>Emily wanted to improve the security and maintenance of her condo complex. With our help, her complex now runs smoothly and securely.</p>
                    </div>
                </div>
            `;
            break;
        case 'scenarios':
            contentDiv.innerHTML = `
                <h1>Scenarios</h1>
                <p>This section will demonstrate various scenarios related to the personas.</p>
            `;
            break;
        default:
            contentDiv.innerHTML = `<h1>Error: Page not found</h1>`;
    }
}

homeTab.addEventListener('click', () => loadContent('home'));
personasTab.addEventListener('click', () => loadContent('personas'));
scenariosTab.addEventListener('click', () => loadContent('scenarios'));

// Clock functionality
function updateClock() {
    const clockDiv = document.getElementById('clock');
    const now = new Date();
    clockDiv.innerHTML = now.toLocaleString();
}

setInterval(updateClock, 1000);  // Update the clock every second
updateClock();  // Initialize clock on page load
