// document.addEventListener("DOMContentLoaded", function() {
//     // Interact with background script to get today's schedule
//     chrome.runtime.getBackgroundPage(function(backgroundPage) {
//         backgroundPage.getToday().then(colors => {
//             document.getElementById("schedule").textContent = colors.join(', ');
//         });
//     });
// });

const times = {
    weekday: [805, 910, 915, 1020, 1050, 1155, 1250, 210, 215, 320],
};
chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const scheduleDiv = document.getElementById("schedule");
    const t = 0;
    if (response.status === "success") {
        for(let c = 0; c < 5; c+=1) {
            scheduleDiv.textContent = scheduleDiv.textContent + response.colors[c] + times.weekday[t] + times.weekday[t + 1];
            t += 2;
        }
    } else {
        scheduleDiv.textContent = "Error fetching schedule: " + response.error;
    }
});
