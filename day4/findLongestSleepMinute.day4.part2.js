const fs = require('fs');

const fileContent = fs.readFileSync('day4/input.txt', 'utf8');

const logArray = fileContent.split("\n");

const formatArray = (logArray) => {
    const logArrayFormatted = logArray.map(log => {
        const time = new Date(log.split('[')[1].split(']')[0]).getTime();
        const msg = log.split(']')[1].trim().split(' ');
        return { time, msg };
    });
    return logArrayFormatted;
};
const sortArray = (logArrayFormatted) => logArrayFormatted.sort((a, b) => a.time - b.time);

const filterArray = (logArraySorted) => {
    const uniqueGuardsArr = getUniqueGuards(logArraySorted);
    const uniqueGuardObj = {};
    uniqueGuardsArr.forEach(uniqueGuard => {
        uniqueGuardObj[uniqueGuard] = [];
        let addToArray = false;
        uniqueGuardObj[uniqueGuard] = logArraySorted.filter((log) => {
            if (log.msg[1] === uniqueGuard) {
                addToArray = true;
                return false;
            } else if (log.msg[0] === 'Guard') {
                addToArray = false;
                return false;
            }
            if (addToArray) {
                return true;
            }
        });
    });
    return uniqueGuardObj;
};
const getUniqueGuards = logArraySorted => [...new Set(logArraySorted.filter(log => log.msg[0] === 'Guard').map(log => log.msg[1]))];

const getDuplicateTimesAndLength = (filteredArrays) => {
    const results = [];
    for (const key in filteredArrays) {
        if (filteredArrays.hasOwnProperty(key)) {
            results.push(getSleepTimesFunc(filteredArrays, key));
        }
    }

    return results;
}

const getSleepTimesFunc = (filteredArrays, key) => {
    const guardLog = filteredArrays[key];
    const timeMap = new Map();
    let sleepTime = 0;
    const splitInCycle = guardLog.reduce(function (result, value, index, array) {
        if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
        return result;
    }, []);
    splitInCycle.forEach((cycle) => {
        let date1 = new Date(cycle[0].time);
        const date2 = new Date(cycle[1].time);
        const difference = date2 - date1;
        const differenceMinutes = difference / 1000 / 60;
        sleepTime += difference;
        for (let index = 0; index < differenceMinutes; index++) {
            if (date1 !== date2) {
                const minutes = date1.getMinutes();
                date1 = new Date(date1.getTime() + 60000);
                if (timeMap.has(minutes)) {
                    timeMap.set(minutes, timeMap.get(minutes) + 1);
                    continue;
                }
                timeMap.set(minutes, 1);
            }
        }
    });
    return { timeMap, sleepTime, key };
}

const getLongestSleepMinutes = (duplicateTimesAndLength) => {
    let highestTimeObj = {time: 0};

    duplicateTimesAndLength.forEach((elem) => {
        const guardId = elem.key;
        for (var [key, value] of elem.timeMap) {
            if (value > highestTimeObj.time) {
                highestTimeObj = {time: value, minute: key, guardId};
            }
        }
    })

    return { guardId: highestTimeObj.guardId, minuteMaxSleep: highestTimeObj.minute };

}

const doFunc = (logArray) => {
    const logArrayFormatted = formatArray(logArray);
    const logArraySorted = sortArray(logArrayFormatted);
    const filteredArrays = filterArray(logArraySorted);
    const duplicateTimesAndLength = getDuplicateTimesAndLength(filteredArrays);

    const result = getLongestSleepMinutes(duplicateTimesAndLength);

    console.log(`The guard ${result.guardId} was asleep the most at minute ${result.minuteMaxSleep}`);
};

doFunc(logArray);