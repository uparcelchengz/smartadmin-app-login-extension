// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

const nameInput = document.querySelector('input[name="name"]');
const secretInput = document.getElementById('secret');
console.log(nameInput, secretInput)
if (nameInput && secretInput) {
    const nameValue = nameInput.value;
    const secretValue = secretInput.value;
    browserAPI.storage.local.set({
        profileData: {
            name: nameValue,
            secret: secretValue
        }
    }, function() {
        console.log('[SmartAdmin] Profile data saved');
    });
}
