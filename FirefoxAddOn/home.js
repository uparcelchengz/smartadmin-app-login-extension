// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

browserAPI.storage.local.get('justLoggedIn', function(result) {
    if(result.justLoggedIn) {
        console.log('[SmartAdmin] User has just logged in');
        browserAPI.storage.local.set({ justLoggedIn: false });
        //open a new tab to view profile page
        let newUrl = window.location.origin + '/admin/view_profile/';
        window.open(newUrl, '_blank');
    }
});