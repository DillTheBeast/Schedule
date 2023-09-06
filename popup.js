document.addEventListener("DOMContentLoaded", function() {
    // Interact with background script to get today's schedule
    chrome.runtime.getBackgroundPage(function(backgroundPage) {
        backgroundPage.getToday().then(colors => {
            document.getElementById("schedule").textContent = colors.join(', ');
        });
    });
});
