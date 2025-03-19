document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const userData = { username, password };

        // Send login data to backend
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = '/dashboard'; // Redirect to the dashboard after successful login
            } else {
                errorMessage.textContent = data.message || 'Invalid username or password.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = 'Something went wrong. Please try again.';
        });
    });
});