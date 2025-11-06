let checkInterval;

chrome.runtime.onInstalled.addListener(function(details) {
    console.log('[SmartAdmin] Extension installed or updated', details);
    createCheckInterval();
});

chrome.runtime.onStartup.addListener(function() {
    console.log('[SmartAdmin] Extension started');
    createCheckInterval();
});

function checkDate(callback) {
    const today = new Date().toDateString();
    chrome.storage.local.get('lastSavedDate', function(result) {
        const lastSavedDate = result.lastSavedDate;
        
        if (lastSavedDate !== today) {
            chrome.storage.local.set({ lastSavedDate: today }, function() {
                callback(false); // New day
            });
        } else {
            callback(true); // Same day
        }
    });
}

function createCheckInterval() {
    if (checkInterval) return;

    checkInterval = setInterval(function() {
        checkDate(function(isSameDay) {
            if (!isSameDay) {
                chrome.storage.local.get('setting_rememberCreds', function(result) {
                    if (!result.setting_rememberCreds) {
                        clearUserCredentials(true);
                        console.log('[SmartAdmin] Cleared user credentials for new day');
                    }
                    else {
                        console.log('[SmartAdmin] Remember Credentials is enabled, no action taken');
                    }
                });
            } else {
                console.log('[SmartAdmin] Same day, no action taken');
            }
        });
    }, 60 * 60 * 1000 ); // Check every hour

    console.log('[SmartAdmin] Check interval created');
}

function clearUserCredentials(silence=false) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.remove(['smartadmin_login', 'profileData', 'justLoggedIn', 'stagingLoggedIn'], function() {
            console.log('[SmartAdmin] All credentials cleared');
            if (silence) return;
            showModal(
                'Success',
                'All credentials have been cleared successfully!',
                [
                    {
                        text: 'OK',
                        onClick: () => renderCredentialsPage()
                    }
                ]
            );
        });
    }
}