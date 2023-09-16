let currentDate;
let PurpleColor;
let BlueColor;
let GreenColor;
let YellowColor;
let OrangeColor;
let TanColor;
let PinkColor;
let RedColor;
let schedule;

chrome.storage.sync.get(['PurpleColor', 'BlueColor', 'GreenColor', 'YellowColor', 'OrangeColor', 'TanColor', 'PinkColor', 'RedColor'], function(data) {
    PurpleColor = data.PurpleColor;
    BlueColor = data.BlueColor;
    GreenColor = data.GreenColor;
    YellowColor = data.YellowColor;
    OrangeColor = data.OrangeColor;
    TanColor = data.TanColor;
    PinkColor = data.PinkColor;
    RedColor = data.RedColor;
    // Now you can use PurpleColor in your schedule

    schedule = {
        NAVY: {
            //Navy + Gold = same
            //No M1 + M2 on schedule
            dayA: [PurpleColor + '/Violet', PinkColor + '/Pink', RedColor + '/Red', YellowColor + '/Yellow', OrangeColor + '/Orange'],
            dayB: [GreenColor + '/Green', BlueColor + '/Blue', TanColor + '/Tan', PurpleColor + '/Violet', PinkColor + '/Pink'],
            dayC: [YellowColor + '/Yellow', RedColor + '/Red', OrangeColor + '/Orange', GreenColor + '/Green', BlueColor + '/Blue'],
            dayD: [TanColor + '/Tan', PurpleColor + '/Violet', PinkColor + '/Pink', RedColor + '/Red', YellowColor + '/Yellow'],
            dayE: [OrangeColor + '/Orange', GreenColor + '/Green', BlueColor + '/Blue', TanColor + '/Tan', PurpleColor + '/Violet'],
            dayF: [PinkColor + '/Pink', RedColor + '/Red', YellowColor + '/Yellow', OrangeColor + '/Orange', GreenColor + '/Green'],
            dayG: [BlueColor + '/Blue', TanColor + '/Tan', PurpleColor + '/Violet', PinkColor + '/Pink', RedColor + '/Red'],
            dayH: [YellowColor + '/Yellow', OrangeColor + '/Orange', GreenColor + '/Green', BlueColor + '/Blue', TanColor + '/Tan'],
        }
    };

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "getTodaySchedule") {
            getToday().then(colors => {
                sendResponse({ status: "success", colors: colors });
            }).catch(error => {
                sendResponse({ status: "error", error: error.toString() });
            });
            return true;  // Indicates you wish to send a response asynchronously.
        }
        if (message.action === "getTomorrowSchedule") {
            console.log("Fetching tomorrow's schedule...");
            getTomorrow().then(colors => {
                sendResponse({ status: "success", colors: colors });
            }).catch(error => {
                sendResponse({ status: "error", error: error.toString() });
            });
            return true;  // Indicates you wish to send a response asynchronously.
        }
    });
});


function getTomorrow() {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);  // Adjust to the next day
        const tomorrowDate = currentDate.toISOString().split('T')[0];
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv';
        const cacheBuster = new Date().getTime();
        const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
        fetch(urlWithCacheBuster, { cache: "no-store" })    
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [date, scheduleDay, week] = lines[i].split(',');
                    if (date === tomorrowDate) {
                        const correctDay = scheduleDay.trim();
                        const colors = schedule.NAVY[correctDay];
                        resolve(colors);
                        return;
                    }
                }
                console.log(`No schedule found for ${tomorrowDate}`);
                reject(`No School tomorrow YAY!!!`);
            })
            .catch(error => {
                console.error('An error occurred:', error);
                reject(error);
            });
    });
}


function getToday() {
    return new Promise((resolve, reject) => {
        currentDate = new Date().toISOString().split('T')[0];
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv';
        const cacheBuster = new Date().getTime();
        const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
        fetch(urlWithCacheBuster, { cache: "no-store" })    
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                for (let i = 1; i < lines.length; i++) {
                    const [date, scheduleDay, week] = lines[i].split(',');
                    if (date === currentDate) {
                        const correctDay = scheduleDay.trim();
                        const colors = schedule.NAVY[correctDay];
                        resolve(colors);
                        return;
                    }
                }
                console.log(`No schedule found for ${currentDate}`);
                //reject(new Error(`No schedule found for ${currentDate}`));
                reject(`No School today YAY!!!`);
            })
            .catch(error => {
                console.error('An error occurred:', error);
                reject(error);
            });
    });
}