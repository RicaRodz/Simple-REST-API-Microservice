const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = [] // <- array of user objects
const { v4: uuidv4 } = require('uuid');
 
// POST -> /users
app.post('/users', (req, res) => {
    // check for email and name
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    // create unique id for new user
    const uniqueId = uuidv4();
    const newUser = { id: uniqueId, name, email };
    users.push(newUser);
    
    // return success status code
    return res.status(201).json(newUser); 
});

// GET -> users/:id
app.get('/users/:id', (req, res) => {
    // look for matching user id
    const user = users.find(u => u.id === req.params.id);
    
    if (user) {
        res.status(200).json(user); // match found!
    }else{
        res.status(404).json({ error: "User not found" });
    }
}); 

// PUT -> users/:id
app.put('/users/:id', (req, res) => {
    // check for email and name
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    // check for matching ID
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;
    return res.status(200).json(user);
});


// DELETE -> users/:id
app.delete('/users/:id', (req, res) => {
    // look for matching user id
    const userIndex = users.findIndex(u => u.id === req.params.id); 

    if (userIndex !== -1) {
        users.splice(userIndex, 1); 
        res.status(204).send(); 
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing