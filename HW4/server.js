const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware для парсинга JSON тела запросов
app.use(express.json());

// Загрузка пользователей из файла
function loadUsers() {
    if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE, 'utf-8');
        return JSON.parse(data);
    }
    return [];
}

// Сохранение пользователей в файл
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Инициализация массива пользователей
let users = loadUsers();

// Регистрация пользователя
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Авторизация пользователя
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
});

// Получение списка пользователей (только для авторизованных пользователей)
app.get('/users', (req, res) => {
    res.json(users);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
