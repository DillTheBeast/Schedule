const times = {
    weekday: [805, 910, 915, 1020, 1050, 1155, 1250, 210, 215, 320],
};

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const todayScheduleDiv = document.getElementById("todaySchedule");
    
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            output += response.colors[c] + " " + times.weekday[2*c] + " " + times.weekday[2*c + 1] + "<br>";
        }
        todayScheduleDiv.innerHTML = output;
    } else {
        todayScheduleDiv.textContent = "Error fetching today's schedule: " + response.error;
    }
});

chrome.runtime.sendMessage({ action: "getTomorrowSchedule" }, response => {
    const tomorrowScheduleDiv = document.getElementById("tomorrowSchedule");
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            output += response.colors[c] + " " + times.weekday[2*c] + " " + times.weekday[2*c + 1] + "<br>";
        }
        tomorrowScheduleDiv.innerHTML = output;
    } else {
        tomorrowScheduleDiv.textContent = "Error fetching today's schedule: " + response.error;
    }
});