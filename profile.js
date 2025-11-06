const nameInput = document.querySelector('input[name="name"]');
const secretInput = document.getElementById('secret');
console.log(nameInput, secretInput)
if (nameInput && secretInput && typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    const nameValue = nameInput.value;
    const secretValue = secretInput.value;
    chrome.storage.local.set({
        profileData: {
            name: nameValue,
            secret: secretValue
        }
    }, function() {
        console.log('[SmartAdmin] Profile data saved');
    });
}
