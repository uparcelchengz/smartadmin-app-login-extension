// Retrieve credentials from chrome.storage.local if available
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get('smartadmin_login', function(result) {
        if (result.smartadmin_login) {
            const { username, password } = result.smartadmin_login;
            document.body.innerHTML += `<p><b>Username:</b> ${username}</p><p><b>Password:</b> ${password}</p>`;
        } else {
            document.body.innerHTML += `<p>No credentials found in storage</p>`;
        }
    });
} else {
    document.body.innerHTML += `<p>chrome.storage.local is not available</p>`;
}