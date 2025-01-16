document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const gender = document.getElementById('gender').value.trim();
        const work = document.getElementById('work').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Check if all required fields are filled
        if (!name || !username || !email || !phone || !gender || !work || !password || !confirmPassword) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            e.preventDefault();
            alert('Passwords do not match.');
            return;
        }

        // Example password strength check
        if (password.length < 6) {
            e.preventDefault();
            alert('Password must be at least 6 characters long.');
            return;
        }
    });
});
