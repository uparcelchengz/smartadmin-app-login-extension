// Content script for SmartAdmin login page
console.log('SmartAdmin Extension content script loaded!');

// Find the login button
const loginBtn = document.querySelector('button[type="submit"].btn-warning');
if (!loginBtn) {
    console.log('Login button not found');
} else {
    loginBtn.addEventListener('click', function () {
        const usernameInput = document.getElementById('id_username');
        const passwordInput = document.getElementById('id_password');
        if (usernameInput && passwordInput && typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            const username = usernameInput.value;
            const password = passwordInput.value;
            chrome.storage.local.set({
                smartadmin_login: {
                    username,
                    password
                }
            }, function() {
                console.log('Credentials saved to chrome.storage.local');
            });
        } else {
            console.log('Username or password input not found or chrome.storage unavailable');
        }
    });
}
