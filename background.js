let currentDate;

const schedule = {
    NAVY: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        dayA: ['violet', 'pink', 'red', 'yellow', 'orange'],
        dayB: ['green', 'blue', 'tan', 'violet', 'pink'],
        dayC: ['yellow', 'red', 'orange', 'green', 'blue'],
        dayD: ['tan', 'violet', 'pink', 'red', 'yellow'],
        dayE: ['orange', 'green', 'blue', 'tan', 'violet'],
        dayF: ['pink', 'red', 'yellow', 'orange', 'green'],
        dayG: ['blue', 'tan', 'violet', 'pink', 'red'],
        dayH: ['yellow', 'orange', 'green', 'blue', 'tan']
    },
    GOLD: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        dayA: ['violet', 'pink', 'red', 'yellow', 'orange'],
        dayB: ['green', 'blue', 'tan', 'violet', 'pink'],
        dayC: ['yellow', 'red', 'orange', 'green', 'blue'],
        dayD: ['tan', 'violet', 'pink', 'red', 'yellow'],
        dayE: ['orange', 'green', 'blue', 'tan', 'violet'],
        dayF: ['pink', 'red', 'yellow', 'orange', 'green'],
        dayG: ['blue', 'tan', 'violet', 'pink', 'red'],
        dayH: ['yellow', 'orange', 'green', 'blue', 'tan']
    }
};


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
                reject(new Error(`No schedule found for ${currentDate}`));
            })
            .catch(error => {
                console.error('An error occurred:', error);
                reject(error);
            });
    });
}

function getTomorrow() {
    return new Promise((resolve, reject) => {
        currentDate = new Date().toISOString().split('T')[1];
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
                reject(new Error(`No schedule found for ${currentDate}`));
            })
            .catch(error => {
                console.error('An error occurred:', error);
                reject(error);
            });
    });
}

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
        getToday().then(colors => {
            
        })
    }
});