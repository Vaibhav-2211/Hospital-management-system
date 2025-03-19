const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS)

let opdQueue = 15; // initial queue length
let avgWaitTime = 45; // initial wait time in minutes
let genWardBeds = 25; // initial general ward beds
let icuBeds = 12; // initial ICU beds

// Route for OPD check-in
app.post('/checkin', (req, res) => {
    const { name, department } = req.body;

    if (!name || !department) {
        return res.status(400).json({ error: 'Patient name and department are required.' });
    }

    // Increment queue length and adjust average wait time
    opdQueue += 1;
    avgWaitTime = Math.round(opdQueue * 3); // assume 3 minutes per patient on average

    return res.json({
        queueLength: opdQueue,
        avgWaitTime: avgWaitTime
    });
});

// Route for patient admission
app.post('/admit', (req, res) => {
    const { name, department } = req.body;

    if (!name || !department) {
        return res.status(400).json({ error: 'Patient name and department are required.' });
    }

    // Check bed availability
    if (department === 'General' && genWardBeds > 0) {
        genWardBeds -= 1;
    } else if (department === 'ICU' && icuBeds > 0) {
        icuBeds -= 1;
    } else {
        return res.status(400).json({ error: 'No available beds in the selected department.' });
    }

    return res.json({
        generalWardBeds: genWardBeds,
        icuBeds: icuBeds
    });
});

// Start the server
app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});