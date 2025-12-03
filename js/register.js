document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const messageDiv = document.getElementById('message');

    if (password !== confirmPassword) {
        messageDiv.textContent = 'Error: Las contraseñas no coinciden.';
        messageDiv.style.display = 'block';
        messageDiv.style.backgroundColor = '#f8d7da'; 
        messageDiv.style.color = '#721c24'; 
        messageDiv.style.padding = '10px';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.border = '1px solid #f5c6cb';
        messageDiv.style.borderRadius = '4px';
        return;
    }

    // Simulación de registro exitoso
    messageDiv.textContent = '¡Registro exitoso! Redirigiendo a Iniciar Sesión...';
    messageDiv.style.display = 'block';
    messageDiv.style.backgroundColor = '#d4edda'; // Verde claro
    messageDiv.style.color = '#155724'; // Texto verde oscuro
    messageDiv.style.padding = '10px';
    messageDiv.style.marginTop = '20px';
    messageDiv.style.border = '1px solid #c3e6cb';
    messageDiv.style.borderRadius = '4px';

    // Redirigir al login después de 2 segundos
    setTimeout(function() {
        window.location.href = 'login_client.html';
    }, 2000);
});