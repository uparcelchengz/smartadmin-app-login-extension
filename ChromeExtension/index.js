// ============================================
// UI RENDERING FUNCTIONS
// ============================================

function renderCredentialsPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <button id="settings-btn" class="settings-btn" title="Settings">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
            </button>
            <span id="credentials-location" class="credentials-location"></span>
            <div class="logo-container">
                <img src="logo.png" alt="SmartAdmin Logo" class="logo">
            </div>
            <h1>SmartAdmin Login Extension</h1>
            <div class="section-title">User Credentials</div>
            <div id="cred-status" class="status">Checking...</div>
            <div id="obtain-link" class="link hidden">Proceed to obtain</div>
            <div class="bottom-section">
                <button id="login-btn" class="btn" disabled>Login to SmartAdmin App</button>
            </div>
        </div>
    `;
    
    attachCredentialsPageHandlers();
    updateCredentialsLocation();
}

function renderConfirmationPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <div class="logo-container">
                <img src="logo.png" alt="SmartAdmin Logo" class="logo">
            </div>
            <h1>SmartAdmin Login Extension</h1>
            <div class="section-title section-reminder">Make sure the SmartAdmin app is running</div>
            <div class="button-group">
                <button id="proceed-btn" class="btn">Proceed</button>
                <button id="wait-btn" class="btn btn-secondary">Wait</button>
            </div>
        </div>
    `;
    
    document.getElementById('proceed-btn').onclick = handleProceed;
    document.getElementById('wait-btn').onclick = handleWait;
}

function renderSettingsPage() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="container">
            <button id="back-btn" class="back-btn" title="Back">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
            </button>
            <div class="logo-container">
                <img src="logo.png" alt="SmartAdmin Logo" class="logo">
            </div>
            <h1>Settings</h1>
            
            <div class="settings-container">
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-title">Clear Credentials</div>
                        <div class="setting-description">Remove all stored login data</div>
                    </div>
                    <div class="setting-action">
                        <button id="clear-cred-btn" class="clear-cred-btn">Clear</button>
                    </div>
                </div>

                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-title">Clear Credentials After App Login</div>
                        <div class="setting-description">
                            Automatically remove login info after use to login SmartAdmin App<br>
                            <span class="section-reminder">(even if "Remember Credentials" is <strong>ON</strong>)</span>
                        </div>
                    </div>
                    <div class="setting-action">
                        <div class="toggle-switch" data-setting="clearCredsAfterLogin">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>

                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-title">Remember Credentials</div>
                        <div class="setting-description">Stop user credentials from being removed every day</div>
                    </div>
                    <div class="setting-action">
                        <div class="toggle-switch" data-setting="rememberCreds">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-title">Auto-login</div>
                        <div class="setting-description">Automatically login with saved credentials</div>
                    </div>
                    <div class="setting-action">
                        <div class="toggle-switch" data-setting="autoLogin">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-title">Auto-fill OTP</div>
                        <div class="setting-description">Automatically fill OTP when available</div>
                    </div>
                    <div class="setting-action">
                        <div class="toggle-switch" data-setting="autoFillOTP">
                            <div class="toggle-slider"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    `;
    
    attachSettingsPageHandlers();
}

// ============================================
// EVENT HANDLERS
// ============================================

function showModal(title, message, buttons) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const buttonsHtml = buttons.map(btn => 
        `<button class="modal-btn ${btn.className || ''}">${btn.text}</button>`
    ).join('');
    
    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-title">${title}</div>
            <div class="modal-message">${message}</div>
            <div class="modal-buttons">
                ${buttonsHtml}
            </div>
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Attach button handlers
    const modalButtons = modalOverlay.querySelectorAll('.modal-btn');
    modalButtons.forEach((btn, index) => {
        btn.onclick = () => {
            document.body.removeChild(modalOverlay);
            if (buttons[index].onClick) {
                buttons[index].onClick();
            }
        };
    });
    
    // Close on overlay click
    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            document.body.removeChild(modalOverlay);
        }
    };
}

function handleObtainCredentials() {
    console.log('Obtain credentials function called');
    if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: 'https://www.uparcel.sg/admin/login' });
    }
}

function handleLoginClick() {
    renderConfirmationPage();
}

function handleProceed() {
    console.log('Proceed function called - implement login logic here');

    if (typeof chrome === 'undefined' || !chrome.storage || !chrome.storage.local) {
        console.error('chrome.storage.local not available');
        return;
    }

    chrome.storage.local.get(['setting_clearCredsAfterLogin', 'smartadmin_login', 'profileData'], async function(result){
        const smart = result.smartadmin_login || {};
        const profile = result.profileData || {};
        const clearCredsAfterLogin = result.setting_clearCredsAfterLogin;

        if (!smart.username || !smart.password || !profile.name || !profile.secret) {
            showModal('Error', 'Missing credentials or profile data. Please set up your credentials first.', [
                { text: 'OK' }
            ]);
            return;
        }

        if (clearCredsAfterLogin) {
            await clearUserCredentials(true);
        }

        const username = encodeURIComponent(smart.username);
        const password = encodeURIComponent(smart.password);
        const name = encodeURIComponent(profile.name);
        const secret = encodeURIComponent(profile.secret);

        const deepLinkUrl = `smartadmin://login?username=${username}&password=${password}&name=${name}&secret=${secret}`;


        // Try to open the deep link in a new tab to trigger protocol handler
        await chrome.tabs.create({ url: deepLinkUrl }, function(tab) {
            console.log('Deep link opened:', deepLinkUrl, 'tabId:', tab && tab.id);

            // Close popup window (optional)
            window.close();
        });
    });
}

function handleWait() {
    console.log('Wait function called - returning to credentials page');
    renderCredentialsPage();
}

function handleSettings() {
    console.log('Opening settings page');
    renderSettingsPage();
}

function handleBackToMain() {
    console.log('Returning to main page');
    renderCredentialsPage();
}

function handleToggleSetting(settingName, isActive) {
    console.log(`Toggle ${settingName}: ${isActive}`);
    // TODO: Save setting to chrome.storage.local
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        const settingKey = `setting_${settingName}`;
        chrome.storage.local.set({ [settingKey]: isActive }, function() {
            console.log(`Setting ${settingName} saved: ${isActive}`);
        });
    }
}

function handleClearCredentials() {
    showModal(
        'Clear Credentials',
        'Are you sure you want to clear all stored credentials? This action cannot be undone.',
        [
            {
                text: 'Cancel',
                className: 'cancel'
            },
            {
                text: 'Clear All',
                className: 'danger',
                onClick: () => { clearUserCredentials(); }
            }
        ]
    );
}

function clearUserCredentials(silence=false) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.remove(['smartadmin_login', 'profileData', 'justLoggedIn', 'stagingLoggedIn'], function() {
            console.log('All credentials cleared');
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

// ============================================
// CREDENTIAL STATUS FUNCTIONS
// ============================================

function showObtainLink() {
    const obtainLink = document.getElementById('obtain-link');
    if (obtainLink) {
        obtainLink.classList.remove('hidden');
        obtainLink.onclick = handleObtainCredentials;
    }
}

function setCredStatus(recorded) {
    const credStatus = document.getElementById('cred-status');
    const loginBtn = document.getElementById('login-btn');
    
    if (!credStatus || !loginBtn) return;
    
    if (recorded) {
        credStatus.textContent = 'Recorded ✓';
        credStatus.classList.add('recorded');
        credStatus.classList.remove('not-recorded');
        loginBtn.disabled = false;
    } else {
        credStatus.textContent = 'Not Recorded';
        credStatus.classList.add('not-recorded');
        credStatus.classList.remove('recorded');
        loginBtn.disabled = true;
        showObtainLink();
    }
}

function checkCredentials() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['smartadmin_login', 'profileData'], function(result) {
            const hasSmartLogin = result.smartadmin_login && 
                                result.smartadmin_login.username && 
                                result.smartadmin_login.password;
            const hasProfile = result.profileData && 
                             result.profileData.name && 
                             result.profileData.secret;
            const recorded = !!(hasSmartLogin && hasProfile);
            setCredStatus(recorded);
        });
    } else {
        setCredStatus(false);
    }
}

function attachCredentialsPageHandlers() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.onclick = handleLoginClick;
    }
    
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.onclick = handleSettings;
    }
    
    checkCredentials();
}

function updateCredentialsLocation() {
    const locationSpan = document.getElementById('credentials-location');
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get('stagingLoggedIn', function(result){
            if (result.stagingLoggedIn === true) {
                locationSpan.textContent = 'Staging';
            } else if (result.stagingLoggedIn === false) {
                locationSpan.textContent = 'Production';
            } else {
                locationSpan.textContent = '';
            }
        })
    }
}

function attachSettingsPageHandlers() {
    const backBtn = document.getElementById('back-btn');
    if (backBtn) {
        backBtn.onclick = handleBackToMain;
    }
    
    const clearCredBtn = document.getElementById('clear-cred-btn');
    if (clearCredBtn) {
        clearCredBtn.onclick = handleClearCredentials;
    }
    
    // Load saved settings and set toggle states
    const toggles = document.querySelectorAll('.toggle-switch');
    const settingKeys = Array.from(toggles).map(toggle => {
        const settingName = toggle.getAttribute('data-setting');
        return `setting_${settingName}`;
    });
    
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(settingKeys, function(result) {
            toggles.forEach(toggle => {
                const settingName = toggle.getAttribute('data-setting');
                const settingKey = `setting_${settingName}`;
                const isActive = result[settingKey] === true;
                
                if (isActive) {
                    toggle.classList.add('active');
                }
                
                // Attach click handler
                toggle.onclick = function() {
                    const newState = this.classList.toggle('active');
                    handleToggleSetting(settingName, newState);
                };
            });
        });
    } else {
        // Fallback: just attach handlers without loading saved state
        toggles.forEach(toggle => {
            toggle.onclick = function() {
                const isActive = this.classList.toggle('active');
                const settingName = this.getAttribute('data-setting');
                handleToggleSetting(settingName, isActive);
            };
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderCredentialsPage();
});
