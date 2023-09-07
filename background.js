let currentDate;

const times = {
    //Shows start for each class time
    //In miltary so no AM and PM needed
    weekday: [0, 800, 805, 915, 1020, 1050, 1200, 1250, 1415, 1520],
};

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

// function getToday() {
//     return new Promise((resolve, reject) => {
//         //Takes date through local computer time
//         //If date on computer is wrong then date taken is wrong
//         currentDate = new Date().toISOString().split('T')[0];
//         //Takes the url for the info
//         const url = 'https://docs.google.com/spreadsheets/d/1diCphG3V5YP3LJPLDY85_GgixC_jiBHczaUgGC4suF8/edit?usp=sharing';
//         //Creates new url for me
//         const cacheBuster = new Date().getTime();
//         const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
//         //Making actual link
//         fetch(urlWithCacheBuster, { cache: "no-store" })    
//             .then(response => response.text())
//             .then(data => {
//         // Splitting the CSV data into lines and parsing
//         const lines = data.split('\n');
//         for (let i = 1; i < lines.length; i++) {
//             const [date, scheduleDay, week] = lines[i].split(',');
//                 if (date === currentDate) {
//                     correctDay = scheduleDay.trim()
//                     console.log(correctDay)
//                     colors = schedule.NAVY[correctDay];
//                     let dayIcon = correctDay.slice(-1);
//                     setIcon(`images/${week}/${dayIcon}-16.png`);
//                     resolve(colors); // resolve the promise with colors
//                     showAll();
//                     return;
//                 }
//             }
//             console.log(`No schedule found for ${currentDate}`);
//             setIcon(`images/icon16.png`);
//             hideAll();
//         })
//         .catch(error => console.error('An error occurred:', error));
//     });
// }

// // ... (The times, schedule, and getToday() function code goes here) ...

// // A function to run when the extension is clicked, or based on other events.
// function display() {
//     getToday().then(colors => {
//         console.log(colors.join(', '));
//         // You can also send this data to your content script if needed.
//     });
// }

// // You can call display() here or based on other events.
// display();
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
});