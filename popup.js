const times = {
    weekday: [805, 910, 915, 1020, 1050, 1155, 1250, 210, 215, 320],
};

chrome.runtime.sendMessage({ action: "getTodaySchedule" }, response => {
    const todayScheduleDiv = document.getElementById("todaySchedule");
    
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            const [className, color] = response.colors[c].split('/');
            output += `<span style="color:${color}">${className}</span> <span style="color:white">${times.weekday[2*c]} ${times.weekday[2*c + 1]}</span><br>`;
        }
        todayScheduleDiv.innerHTML = output;
    } else {
        todayScheduleDiv.textContent = response.error;
    }
});

chrome.runtime.sendMessage({ action: "getTomorrowSchedule" }, response => {
    const tomorrowScheduleDiv = document.getElementById("tomorrowSchedule");
    if (response.status === "success") {
        let output = "";
        for(let c = 0; c < response.colors.length; c++) {
            const [className, color] = response.colors[c].split('/');
            output += `<span style="color:${color}">${className}</span> <span style="color:white">${times.weekday[2*c]} ${times.weekday[2*c + 1]}</span><br>`;
        }
        tomorrowScheduleDiv.innerHTML = output;
    } else {
        tomorrowScheduleDiv.textContent = response.error;
    }
});