const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'tunzymd_secret_key_2024';
const usersFile = path.join(__dirname, 'data', 'users.json');
const botsFile = path.join(__dirname, 'data', 'bots.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize data files
if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]));
}
if (!fs.existsSync(botsFile)) {
    fs.writeFileSync(botsFile, JSON.stringify({}));
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'tunzymd_session_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Helper functions
function readUsers() {
    return JSON.parse(fs.readFileSync(usersFile));
}

function writeUsers(users) {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

function readBots() {
    return JSON.parse(fs.readFileSync(botsFile));
}

function writeBots(bots) {
    fs.writeFileSync(botsFile, JSON.stringify(bots, null, 2));
}

// Auth middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Routes

// Register
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const users = readUsers();
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password: hashedPassword,
        botSetup: false,
        createdAt: new Date().toISOString(),
        bots: []
    };
    
    users.push(newUser);
    writeUsers(users);
    
    // Create token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
        token,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            botSetup: newUser.botSetup
        }
    });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    
    const users = readUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            botSetup: user.botSetup || false
        }
    });
});

// Get user data
app.get('/api/user', authenticateToken, (req, res) => {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        botSetup: user.botSetup || false,
        botName: user.botName,
        prefix: user.prefix,
        ownerNumber: user.ownerNumber
    });
});

// Setup bot
app.post('/api/setup', authenticateToken, (req, res) => {
    const { ownerNumber, prefix, botName } = req.body;
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex].botSetup = true;
    users[userIndex].ownerNumber = ownerNumber;
    users[userIndex].prefix = prefix;
    users[userIndex].botName = botName;
    
    writeUsers(users);
    
    res.json({ success: true });
});

// Pair bot (simulated - integrate with actual WhatsApp pairing)
app.post('/api/pair', authenticateToken, (req, res) => {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({ error: 'Phone number required' });
    }
    
    // Generate 8-digit code
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();
    
    // Store pairing request
    const bots = readBots();
    if (!bots[req.user.id]) {
        bots[req.user.id] = [];
    }
    
    // Check if already connected
    const existingBot = bots[req.user.id].find(b => b.phone === phone);
    if (existingBot && existingBot.status === 'connected') {
        return res.json({ status: 'already_connected' });
    }
    
    // Add pairing request
    bots[req.user.id].push({
        id: Date.now().toString(),
        phone,
        code,
        status: 'pairing',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 5 * 60000).toISOString()
    });
    
    writeBots(bots);
    
    res.json({ code });
});

// Check pairing status
app.get('/api/status/:phone', authenticateToken, (req, res) => {
    const { phone } = req.params;
    const bots = readBots();
    const userBots = bots[req.user.id] || [];
    
    const bot = userBots.find(b => b.phone === phone);
    
    if (bot && bot.status === 'connected') {
        return res.json({ status: 'connected' });
    }
    
    res.json({ status: 'pending' });
});

// Get user's bots
app.get('/api/bots', authenticateToken, (req, res) => {
    const bots = readBots();
    const userBots = bots[req.user.id] || [];
    
    res.json(userBots.filter(b => b.status === 'connected'));
});

// Get bot status
app.get('/api/bot/status', authenticateToken, (req, res) => {
    const bots = readBots();
    const userBots = bots[req.user.id] || [];
    const connectedBot = userBots.find(b => b.status === 'connected');
    
    res.json({
        connected: !!connectedBot,
        uptime: connectedBot?.uptime || null,
        phone: connectedBot?.phone || null
    });
});

// Remove bot
app.delete('/api/bot/:botId', authenticateToken, (req, res) => {
    const { botId } = req.params;
    const bots = readBots();
    
    if (bots[req.user.id]) {
        bots[req.user.id] = bots[req.user.id].filter(b => b.id !== botId);
        writeBots(bots);
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Bot not found' });
    }
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
    const bots = readBots();
    let activeBots = 0;
    
    for (const userId in bots) {
        activeBots += bots[userId].filter(b => b.status === 'connected').length;
    }
    
    res.json({ active: activeBots });
});

// Start server
app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`📱 Visit http://localhost:${PORT}/login.html to get started`);
});
