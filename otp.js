const currentUrl = window.location.href;

chrome.storage.local.set({
    justLoggedIn: currentUrl.includes('/admin/otp/'),
    stagingLoggedIn: currentUrl.includes('stg')
});

chrome.storage.local.get(['setting_autoFillOTP', 'profileData'], function(result) {
    if(!result.profileData || !result.profileData.secret) {
        console.log('[SmartAdmin] No secret found in profileData');
        return;
    }
    if(!result.setting_autoFillOTP) {
        console.log('[SmartAdmin] Auto-fill OTP is disabled');
        return;
    }

    try {
        const secret = result.profileData.secret;
        console.log('[SmartAdmin] Using secret:', secret);
        
        // Generate OTP using otpauth library
        const totp = new OTPAuth.TOTP({
            algorithm: 'SHA1',
            digits: 6,
            period: 30,
            secret: secret
        });
        
        const otpCode = totp.generate();
        
        console.log('[SmartAdmin] Generated OTP:', otpCode);
        console.log('[SmartAdmin] Expires in:', 30 - (Math.floor(Date.now() / 1000) % 30), 'seconds');

        // Fill the OTP input field
        const otpInput = document.getElementById('otp');
        if(otpInput) {
            otpInput.value = otpCode;
            otpInput.dispatchEvent(new Event('input', { bubbles: true }));
            otpInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log('[SmartAdmin] OTP code auto-filled:', otpCode);
        } else {
            console.log('[SmartAdmin] OTP input field not found');
        }

        // Auto-submit
        const submitBtn = document.querySelector('button[type="submit"]');
        if(submitBtn) {
            setTimeout(() => submitBtn.click(), 200);
        }
        
    } catch (error) {
        console.error('[SmartAdmin] Error generating OTP:', error);
        console.error('[SmartAdmin] Error details:', error.message);
    }
});