document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const message = document.getElementById('message');
    const showPasswordCheckbox = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');

    // Toggle Password Visibility for Password Field
    showPasswordCheckbox.addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create a user object
        const user = {
            email: email,
            password: password
        };

        // Send data to REST API
        fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                message.textContent = 'Login successful!';
                message.style.color = 'green';
                loginForm.reset();
                sessionStorage.setItem("isAuth","true")
                window.location.replace("/Home/Home.html")
            } else {
                message.textContent = data.message || 'Error logging in.';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'Error logging in.';
            message.style.color = 'red';
        });
    });
});
