const loginBtn = document.querySelector('button[type="submit"].btn-warning');
if (!loginBtn) {
    console.log('[SmartAdmin] Login button not found');
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
                console.log('[SmartAdmin] Credentials saved');
            });
        } else {
            console.log('[SmartAdmin]Username or password input not found');
        }
    });
}
