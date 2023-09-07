// document.addEventListener("DOMContentLoaded", function() {
//     // Interact with background script to get today's schedule
//     chrome.runtime.getBackgroundPage(function(backgroundPage) {
//         backgroundPage.getToday().then(colors => {
//             document.getElementById("schedule").textContent = colors.join(', ');
//         });
//     });
// });

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const scheduleDiv = document.getElementById("schedule");
    
    if (response.status === "success") {
        scheduleDiv.textContent = response.colors.join(', ');
    } else {
        scheduleDiv.textContent = "Error fetching schedule: " + response.error;
    }
});
