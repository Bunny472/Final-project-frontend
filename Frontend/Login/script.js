document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const message = document.getElementById('message');
    const showPasswordCheckbox = document.getElementById('showPassword');
    const showConfirmPasswordCheckbox = document.getElementById('showConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Toggle Password Visibility for Password Field
    showPasswordCheckbox.addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
    });

    // Toggle Password Visibility for Confirm Password Field
    showConfirmPasswordCheckbox.addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        confirmPasswordInput.type = type;
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords match
        if (password !== confirmPassword) {
            message.textContent = 'Passwords do not match.';
            message.style.color = 'red';
            return;
        }

        // Create a user object
        const user = {
            fullname: fullname,
            email: email,
            password: password
        };

        // Send data to REST API
        fetch('http://127.0.0.1:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                message.textContent = 'Account created successfully!';
                message.style.color = 'green';
                signupForm.reset();
            } else {
                message.textContent = data.message || 'Error creating account.';
                message.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.textContent = 'Error creating account.';
            message.style.color = 'red';
        });
    });
});
