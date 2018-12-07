const fs = require('fs');
const dayjs = require('dayjs');

const fileContent = fs.readFileSync('day4/input.1.txt', 'utf8');

const logArray = fileContent.split("\n");



const formatArray = (logArray) => {
    // console.log(logArray);
    const logArrayFormatted = [];
    logArray.forEach(log => {
        const time = new Date(log.split('[')[1].split(']')[0]).getTime();
        const msg = log.split(']')[1].trim().split(' ');
        logArrayFormatted.push({ time, msg });
    });
    return logArrayFormatted;
};
const sortArray = (logArrayFormatted) => logArrayFormatted.sort((a, b) => a.time - b.time);;

const groupGuardActivites = (logArraySorted) => {
    const groupedGuards = {};
    let currentGuardObj = false;
    for (let index = 0; index < logArraySorted.length; index++) {
        const logArray = logArraySorted[index];
        const action = logArray.msg[0] === 'wakes' ? 'start' : 'end';
        if (logArray.msg[0] === 'Guard') {
            if (currentGuardObj) {
                groupedGuards[currentGuardObj.index].push({ time: logArray.time, action, guardId: currentGuardObj.guardId });
            }
            groupedGuards[index] = [{ time: logArray.time, action: 'start', guardId: logArray.msg[1] }];
            currentGuardObj = { guardId: logArray.msg[1], index }
            continue;
        };
        groupedGuards[currentGuardObj.index].push({ time: logArray.time, action, guardId: currentGuardObj.guardId });
    }
    return groupedGuards;
};

const calculateGuardSleepTime = (groupedGuardActivites) => {

};

const doFunc = (logArray) => {
    const logArrayFormatted = formatArray(logArray);
    const logArraySorted = sortArray(logArrayFormatted);
    const groupedGuardActivites = groupGuardActivites(logArraySorted);
    const calculatedGuardSleepTime = calculateGuardSleepTime(groupedGuardActivites);
    console.log(calculatedGuardSleepTime);
};

doFunc(logArray);