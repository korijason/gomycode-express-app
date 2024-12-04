// Import required modules
const express = require('express');
const path = require('path');

const app = express();

// Middleware to check working hours (Monday-Friday, 9 AM-5 PM)
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const hour = now.getHours();

    // Check if the current time is within working hours
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Proceed to the next middleware or route handler
    } else {
        res.send('<h1>Our services are available only during working hours (Monday to Friday, 9 AM - 5 PM).</h1>');
    }
}

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check working hours for all routes
app.use(checkWorkingHours);

// Define routes
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { pageTitle: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Contact Us' });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
