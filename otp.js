const currentUrl = window.location.href;

chrome.storage.local.set({
    justLoggedIn: currentUrl.includes('/admin/otp/'),
    stagingLoggedIn: currentUrl.includes('stg')
})