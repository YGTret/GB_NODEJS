const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Путь к файлу для хранения счетчиков
const COUNTER_FILE = path.join(__dirname, 'counters.json');

// Инициализация счетчиков просмотров
let counters = {
    home: 0,
    about: 0
};

// Загрузка счетчиков из файла
function loadCounters() {
    if (fs.existsSync(COUNTER_FILE)) {
        const data = fs.readFileSync(COUNTER_FILE, 'utf-8');
        counters = JSON.parse(data);
    }
}

// Сохранение счетчиков в файл
function saveCounters() {
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(counters));
}

// Обработчик для главной страницы
app.get('/', (req, res) => {
    counters.home++;
    saveCounters();
    res.send(`
        <h1>Home Page</h1>
        <p>This page has been viewed ${counters.home} times.</p>
        <a href="/about">Go to About Page</a>
    `);
});

// Обработчик для страницы About
app.get('/about', (req, res) => {
    counters.about++;
    saveCounters();
    res.send(`
        <h1>About Page</h1>
        <p>This page has been viewed ${counters.about} times.</p>
        <a href="/">Go to Home Page</a>
    `);
});

// Обработчик для несуществующих маршрутов (404)
app.use((req, res) => {
    res.status(404).send(`
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <a href="/">Go to Home Page</a>
    `);
});

// Загрузка счетчиков при запуске сервера
loadCounters();

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
