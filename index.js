const express = require('express');
const path = require('path');
const Logger = require('./middleware/logger'); 

const app = express();

// ----------------------------------------------------------------------
// Initialize Middleware
    app.use(Logger);
// ----------------------------------------------------------------------
// Body Parser (Middleware)
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
// ----------------------------------------------------------------------
// Set Static Folder manually
// app.get('/',(req, res) => {
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });
// ----------------------------------------------------------------------
// Set Static Folder
    app.use(express.static(path.join(__dirname, 'public')));
// ----------------------------------------------------------------------
// Member API Routes
    app.use('/api/members', require('./routes/api/members'));
    const PORT = process.env.PORT || 5000;
// ----------------------------------------------------------------------
// Listening to Port    
    app.listen(PORT,() =>{
        console.log(`Server started on Port ${PORT}`);
    });