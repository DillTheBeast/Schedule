// document.addEventListener("DOMContentLoaded", function() {
//     // Interact with background script to get today's schedule
//     chrome.runtime.getBackgroundPage(function(backgroundPage) {
//         backgroundPage.getToday().then(colors => {
//             document.getElementById("schedule").textContent = colors.join(', ');
//         });
//     });
// });

const times = {
    //Shows start for each class time
    //In miltary so no AM and PM needed
    weekday: [810, 915, 1020, 1050, 1200, 1250, 1415, 1520],
};

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const scheduleDiv = document.getElementById("schedule");
    
    if (response.status === "success") {
        
        scheduleDiv.textContent = response.colors[0];
    } else {
        scheduleDiv.textContent = "Error fetching schedule: " + response.error;
    }
});
