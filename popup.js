// document.addEventListener("DOMContentLoaded", function() {
//     // Interact with background script to get today's schedule
//     chrome.runtime.getBackgroundPage(function(backgroundPage) {
//         backgroundPage.getToday().then(colors => {
//             document.getElementById("schedule").textContent = colors.join(', ');
//         });
//     });
// });

const times = {
    weekday: [800, 805, 915, 1020, 1050, 1200, 1250, 1415, 1520],
};
chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const scheduleDiv = document.getElementById("schedule");
    const t = 0;
    if (response.status === "success") {
        for(let c = 0; c < 5; c+=1) {
            scheduleDiv.textContent = c.toString();
            //t += 2;
        }
    } else {
        scheduleDiv.textContent = "Error fetching schedule: " + response.error;
    }
});
