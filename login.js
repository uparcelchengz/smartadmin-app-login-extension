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

chrome.storage.local.get(['setting_autoLogin', 'smartadmin_login'], function(result) {
    if(!result.smartadmin_login) return;
    if(!result.setting_autoLogin) return;

    const usernameInput = document.getElementById('id_username');
    const passwordInput = document.getElementById('id_password');

    if (usernameInput && passwordInput) {
        usernameInput.value = result.smartadmin_login.username;
        passwordInput.value = result.smartadmin_login.password;
        console.log('[SmartAdmin] Auto-filled login credentials');
    } else {
        console.log('[SmartAdmin] Username or password input not found for auto-fill');
    }

    // Auto-click login button
    setTimeout(() => loginBtn.click(), 200);
});