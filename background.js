let currentDate;

const schedule = {
    NAVY: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        //Switch my classes with whatever classes you have
        dayA: ['violet/History', 'pink/Math', 'red/CSA', 'yellow/Chem', 'orange/Spanish'],
        dayB: ['green/Free', 'blue/English', 'tan/Innovation', 'violet/History', 'pink/Math'],
        dayC: ['yellow/Chem', 'red/CSA', 'orange/Spanish', 'green/Free', 'blue/English'],
        dayD: ['tan/Innovation', 'violet/History', 'pink/Math', 'red/CSA', 'yellow/Chem'],
        dayE: ['orange/Spanish', 'green/Free', 'blue/English', 'tan/Innovation', 'violet/History'],
        dayF: ['pink/Math', 'red/CSA', 'yellow/Chem', 'orange/Spanish', 'green/Free'],
        dayG: ['blue/English', 'tan/Innovation', 'violet/History', 'pink/Math', 'red/CSA'],
        dayH: ['yellow/Chem', 'orange/Spanish', 'green/Free', 'blue/English', 'tan/Innovation'],
    },
    GOLD: {
        //Navy + Gold = same
        //No M1 + M2 on schedule
        dayA: ['violet/History', 'pink/Math', 'red/CSA', 'yellow/Chem', 'orange/Spanish'],
        dayB: ['green/Free', 'blue/English', 'tan/Innovation', 'violet/History', 'pink/Math'],
        dayC: ['yellow/Chem', 'red/CSA', 'orange/Spanish', 'green/Free', 'blue/English'],
        dayD: ['tan/Innovation', 'violet/History', 'pink/Math', 'red/CSA', 'yellow/Chem'],
        dayE: ['orange/Spanish', 'green/Free', 'blue/English', 'tan/Innovation', 'violet/History'],
        dayF: ['pink/Math', 'red/CSA', 'yellow/Chem', 'orange/Spanish', 'green/Free'],
        dayG: ['blue/English', 'tan/Innovation', 'violet/History', 'pink/Math', 'red/CSA'],
        dayH: ['yellow/Chem', 'orange/Spanish', 'green/Free', 'blue/English', 'tan/Innovation'],
    }
};


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
                reject(new Error(`No schedule found for ${tomorrowDate}`));
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
        console.log("Fetching tomorrow's schedule...");
        getTomorrow().then(colors => {
            sendResponse({ status: "success", colors: colors });
        }).catch(error => {
            sendResponse({ status: "error", error: error.toString() });
        });
        return true;  // Indicates you wish to send a response asynchronously.
    }
});