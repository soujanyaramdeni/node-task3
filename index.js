const express = require("express");
// const fs = require("fs");
const app = express();
app.use(express.json());
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./files');
const port = 3001;
let users = [];

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (users.some(user => user.email === email)) {
        return res.status(409).json({ error: "Email is already registered" });
    }
    const newUser = { username, email, password };
    users.push(newUser);
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password" });
    }
    if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
    }
    localStorage.setItem("value", JSON.stringify(users));
    const storedValue = localStorage.getItem("value");
    res.send({ storedValue });
    res.status(201).json({ message: "User registered successfully" });
})
});
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});