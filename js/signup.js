// signup.js

document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Simple validation
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (!document.getElementById('acceptPolicy').checked) {
            alert('You must accept the Privacy Policy to sign up.');
            return;
        }

        // If validation passes, you can proceed with the sign-up logic
        // Example: sending data to the server (e.g., via fetch API)
        alert('Sign up successful!'); // Placeholder for actual sign-up logic

        // Clear form fields
        signupForm.reset();
    });
});

// SignUp actually not possible
document.getElementById('registerButton').addEventListener('click', function(event) {
    event.preventDefault();
    alert('Registration is currently not possible. Please Login with the Guest Login')
    window.location.href = 'login.html';
  });