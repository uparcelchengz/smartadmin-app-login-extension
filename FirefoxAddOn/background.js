// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

let checkInterval;

browserAPI.runtime.onInstalled.addListener(function(details) {
    console.log('[SmartAdmin] Extension installed or updated', details);
    createCheckInterval();
});

browserAPI.runtime.onStartup.addListener(function() {
    console.log('[SmartAdmin] Extension started');
    createCheckInterval();
});

function checkDate(callback) {
    const today = new Date().toDateString();
    browserAPI.storage.local.get('lastSavedDate', function(result) {
        const lastSavedDate = result.lastSavedDate;
        
        if (lastSavedDate !== today) {
            browserAPI.storage.local.set({ lastSavedDate: today }, function() {
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
                browserAPI.storage.local.get('setting_rememberCreds', function(result) {
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
    browserAPI.storage.local.remove(['smartadmin_login', 'profileData', 'justLoggedIn', 'stagingLoggedIn'], function() {
        console.log('[SmartAdmin] All credentials cleared');
    });
}