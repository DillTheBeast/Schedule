const times = {
    weekday: [805, 910, 915, 1020, 1050, 1155, 1250, 210, 215, 320],
};

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const scheduleDiv = document.getElementById("schedule");
    
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            output += response.colors[c] + " " + times.weekday[2*c] + " " + times.weekday[2*c + 1] + "<br>";
        }
        scheduleDiv.innerHTML = output;
    } else {
        scheduleDiv.textContent = "Error fetching schedule: " + response.error;
    }
});
