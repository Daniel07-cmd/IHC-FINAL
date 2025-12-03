document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Credenciales de prueba
    const TEST_EMAIL = 'cliente@prueba.com';
    const TEST_PASSWORD = '123456';

    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        // Redirigir a la página de productos al iniciar sesión
        window.location.href = 'products.html'; 
    } else {
        messageDiv.textContent = 'Error: Email o contraseña incorrectos.';
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f8d7da'; // Rojo claro
        messageDiv.style.color = '#721c24'; // Texto rojo oscuro
        messageDiv.style.padding = '10px';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.border = '1px solid #f5c6cb';
        messageDiv.style.borderRadius = '4px';
    }
});
