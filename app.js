const express = require('express');
const app = express();
const path = require('path');

// Public folder ko static folder banao
app.use(express.static(path.join(__dirname, 'public')));

// Views folder ke HTML file serve karne ke liye
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
